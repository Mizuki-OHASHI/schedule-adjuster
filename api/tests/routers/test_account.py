from copy import deepcopy
import pytest

from src.schemas.account import AccountRole


def test_account_workflow(client, session):
    # 1. 既存のAccountの取得
    response = client.get("/accounts")
    assert response.status_code == 200
    initial_accounts = response.json()

    # 2. 新しいAccountの追加
    new_account = {
        "user_id": "user_id_1",
        "group_id": "group_id_1",
        "role": AccountRole.MEMBER,
        "name": "New Account",
    }
    response = client.post("/account", json=new_account)
    if response.status_code != 200:
        print(response.json())
    assert response.status_code == 200
    added_account = response.json()
    assert added_account["user_id"] == new_account["user_id"]
    assert added_account["group_id"] == new_account["group_id"]
    assert added_account["role"] == new_account["role"].value
    assert added_account["name"] == new_account["name"]

    # 3. 再び全Accountを取得して、Accountが追加されたことを確認
    response = client.get("/accounts")
    assert response.status_code == 200
    final_accounts = response.json()
    assert len(final_accounts) == len(initial_accounts) + 1
    delta_accounts = [
        account for account in final_accounts if account not in initial_accounts
    ]
    assert len(delta_accounts) == 1
    assert delta_accounts[0]["user_id"] == new_account["user_id"]
    assert delta_accounts[0]["group_id"] == new_account["group_id"]
    assert delta_accounts[0]["role"] == new_account["role"].value
    assert delta_accounts[0]["name"] == new_account["name"]

    # 4. 追加したAccountの取得
    account_id = delta_accounts[0]["id"]
    response = client.get(f"/account/{account_id}")
    assert response.status_code == 200
    account = response.json()
    assert account["user_id"] == new_account["user_id"]
    assert account["group_id"] == new_account["group_id"]
    assert account["role"] == new_account["role"].value
    assert account["name"] == new_account["name"]

    # 5. Account情報の更新
    updated_account = deepcopy(account)
    updated_account["name"] = "Updated Account"
    updated_account["role"] = AccountRole.ADMIN
    response = client.put(f"/account/{account_id}", json=updated_account)
    assert response.status_code == 200
    updated_account = response.json()
    assert updated_account["name"] == "Updated Account"
    assert updated_account["role"] == AccountRole.ADMIN.value

    # 6. 更新したAccountの取得
    response = client.get(f"/account/{account_id}")
    assert response.status_code == 200
    account = response.json()
    assert account["name"] == updated_account["name"]
    assert account["role"] == updated_account["role"]
    assert account["user_id"] == updated_account["user_id"]
    assert account["group_id"] == updated_account["group_id"]
