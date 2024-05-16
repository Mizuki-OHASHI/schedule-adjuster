import os
import sys

current_file_path = os.path.abspath(__file__)
getparent = lambda path, level: (
    os.path.dirname(path) if level == 1 else getparent(os.path.dirname(path), level - 1)
)
root_dir = getparent(current_file_path, 1)
sys.path.append(root_dir)
