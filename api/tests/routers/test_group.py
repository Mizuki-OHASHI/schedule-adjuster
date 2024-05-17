from copy import deepcopy
import pytest


def test_group_workflow(client, session):
    # 1. 全グループの取得
    response = client.get("/groups")
    assert response.status_code == 200
    initial_groups = response.json()

    # 2. 新しいグループの追加
    new_group = {"name": "New Group", "description": "This is a new group."}
    response = client.post("/group", json=new_group)
    if response.status_code != 200:
        print(response.json())
    assert response.status_code == 200
    added_group = response.json()
    assert added_group["name"] == new_group["name"]
    assert added_group["description"] == new_group["description"]

    # 3. 再び全グループを取得して、グループが追加されたことを確認
    response = client.get("/groups")
    assert response.status_code == 200
    final_groups = response.json()
    assert len(final_groups) == len(initial_groups) + 1
    delta_groups = [group for group in final_groups if group not in initial_groups]
    assert len(delta_groups) == 1
    assert delta_groups[0]["name"] == new_group["name"]
    assert delta_groups[0]["description"] == new_group["description"]

    # 4. 追加したグループの取得
    group_id = delta_groups[0]["id"]
    print(delta_groups[0])
    response = client.get(f"/group/{group_id}")
    assert response.status_code == 200
    group = response.json()
    assert group["name"] == new_group["name"]
    assert group["description"] == new_group["description"]

    # 5. グループ情報の更新
    updated_group = deepcopy(group)
    updated_group["name"] = "Updated Group"
    updated_group["description"] = "This is an updated group."
    response = client.put(f"/group/{group_id}", json=updated_group)
    assert response.status_code == 200
    updated_group = response.json()
    assert updated_group["name"] == "Updated Group"
    assert updated_group["description"] == "This is an updated group."

    # 6. 更新したグループの取得
    response = client.get(f"/group/{group_id}")
    assert response.status_code == 200
    group = response.json()
    assert group["name"] == updated_group["name"]
    assert group["description"] == updated_group["description"]
