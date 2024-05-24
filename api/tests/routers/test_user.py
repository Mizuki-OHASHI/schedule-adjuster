from copy import deepcopy
import pytest


def test_user_workflow(client, session):
    # 1. 全ユーザーの取得
    response = client.get("/users")
    assert response.status_code == 200
    initial_users = response.json()

    # 2. 新しいユーザーの追加
    new_user = {
        "name": "Charlie",
        "role": "USER",
        "email": "charlie@example.com",
        "birthday": "1993-03-03",
    }
    response = client.post("/user", json=new_user)
    if response.status_code != 200:
        print(response.json())
    assert response.status_code == 200
    added_user = response.json()
    assert added_user["name"] == new_user["name"]
    assert added_user["role"] == new_user["role"]
    assert added_user["email"] == new_user["email"]

    # 3. 再び全ユーザーを取得して、ユーザーが追加されたことを確認
    response = client.get("/users")
    assert response.status_code == 200
    final_users = response.json()
    assert len(final_users) == len(initial_users) + 1
    delta_users = [user for user in final_users if user not in initial_users]
    assert len(delta_users) == 1
    assert delta_users[0]["name"] == new_user["name"]
    assert delta_users[0]["role"] == new_user["role"]
    assert delta_users[0]["email"] == new_user["email"]

    # 4. 追加したユーザーの取得
    user_id = delta_users[0]["id"]
    response = client.get(f"/user/{user_id}")
    assert response.status_code == 200
    user = response.json()
    assert user["name"] == new_user["name"]
    assert user["role"] == new_user["role"]
    assert user["email"] == new_user["email"]

    # 5. ユーザー情報の更新
    updated_user = deepcopy(user)
    updated_user["name"] = "Charlie Brown"
    updated_user["role"] = "ADMIN"
    response = client.put(f"/user/{user_id}", json=updated_user)
    assert response.status_code == 200
    updated_user = response.json()
    assert updated_user["name"] == "Charlie Brown"
    assert updated_user["role"] == "ADMIN"

    # 6. 更新したユーザーの取得
    response = client.get(f"/user/{user_id}")
    assert response.status_code == 200
    user = response.json()
    assert user["name"] == updated_user["name"]
    assert user["role"] == updated_user["role"]
    assert user["email"] == updated_user["email"]
    assert user["birthday"] == updated_user["birthday"]
