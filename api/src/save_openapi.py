if __name__ == "__main__":
    import os
    import sys
    from typing import Any, Dict

    current_file_path = os.path.abspath(__file__)
    getparent = lambda path, level: (
        os.path.dirname(path)
        if level == 1
        else getparent(os.path.dirname(path), level - 1)
    )
    root_dir = getparent(current_file_path, 2)
    sys.path.append(root_dir)

    from json import dump

    from src.main import app

    DEFAULT_OUTPUT_PATH = os.path.join(root_dir, "openapi.json")
    OUTPUT_PATH = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_OUTPUT_PATH

    openapi_dict = app.openapi()
    openapi_dict["openapi"] = "3.0.1"
    openapi_dict["info"] = {
        "title": "Schedule Adjuster API",
        "version": "0.1.0",
    }

    # Optional[T] = T | None が Anyof になってしまう問題を修正
    def fix_anyof(schema: Dict[str, Any]):
        if "anyOf" in schema:
            if len(schema["anyOf"]) > 1:
                for key in schema["anyOf"][0]:
                    schema[key] = schema["anyOf"][0][key]
                anyOf = schema.pop("anyOf")
                print("fixed {}".format(anyOf))
        else:
            for key in schema:
                if isinstance(schema[key], dict):
                    fix_anyof(schema[key])
                elif isinstance(schema[key], list):
                    for item in schema[key]:
                        if isinstance(item, dict):
                            fix_anyof(item)

    fix_anyof(openapi_dict)

    with open(OUTPUT_PATH, "w") as f:
        try:
            dump(openapi_dict, f, indent=2)
            print(f"OpenAPI schema is saved to {OUTPUT_PATH}")
        except Exception as e:
            print(e)
            print(openapi_dict)
