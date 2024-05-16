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


def test_many_users_workflow(client, session):
    # 1. 全ユーザーの取得
    response = client.get("/users")
    assert response.status_code == 200
    initial_users = response.json()

    # 2. 複数ユーザーの追加
    new_users = [
        {
            "name": "Alice",
            "role": "USER",
            "email": "alice@example.com",
            "birthday": "1990-01-01",
        },
        {
            "name": "Bob",
            "role": "USER",
            "email": "bob@example.com",
            "birthday": "1992-02-02",
        },
    ]
    response = client.post("/users", json=new_users)
    if response.status_code != 200:
        print(response.json())
    assert response.status_code == 200
    added_users = response.json()
    assert len(added_users) == len(new_users)

    for added_user, new_user in zip(added_users, new_users):
        assert added_user["name"] == new_user["name"]
        assert added_user["role"] == new_user["role"]
        assert added_user["email"] == new_user["email"]

    # 3. 再び全ユーザーを取得して、ユーザーが追加されたことを確認
    response = client.get("/users")
    assert response.status_code == 200
    final_users = response.json()
    assert len(final_users) == len(initial_users) + len(new_users)

    delta_users = [user for user in final_users if user not in initial_users]
    assert len(delta_users) == len(new_users)

    for delta_user, new_user in zip(delta_users, new_users):
        assert delta_user["name"] == new_user["name"]
        assert delta_user["role"] == new_user["role"]
        assert delta_user["email"] == new_user["email"]

    # 4. 追加したユーザーの取得と検証
    for added_user in delta_users:
        user_id = added_user["id"]
        response = client.get(f"/user/{user_id}")
        assert response.status_code == 200
        user = response.json()
        corresponding_new_user = next(
            u for u in new_users if u["email"] == user["email"]
        )
        assert user["name"] == corresponding_new_user["name"]
        assert user["role"] == corresponding_new_user["role"]
        assert user["email"] == corresponding_new_user["email"]

    # 5. ユーザー情報の更新
    updated_users = deepcopy(delta_users)
    updated_users[0]["name"] = "Alice Wonderland"
    updated_users[0]["role"] = "ADMIN"
    updated_users[1]["name"] = "Bob Builder"
    updated_users[1]["role"] = "ADMIN"

    for updated_user in updated_users:
        user_id = updated_user["id"]
        response = client.put(f"/user/{user_id}", json=updated_user)
        assert response.status_code == 200
        updated_user_response = response.json()
        assert updated_user_response["name"] == updated_user["name"]
        assert updated_user_response["role"] == updated_user["role"]

    # 6. 更新したユーザーの取得と検証
    for updated_user in updated_users:
        user_id = updated_user["id"]
        response = client.get(f"/user/{user_id}")
        assert response.status_code == 200
        user = response.json()
        assert user["name"] == updated_user["name"]
        assert user["role"] == updated_user["role"]
        assert user["email"] == updated_user["email"]
        assert user["birthday"] == updated_user["birthday"]
