class Api::V1::UsersController < ApplicationController
  def index
    # userの配列を仮想的に作成
    users = [
      { id: 1, email: 'hoge@example.com' },
      { id: 2, email: 'fuga@example.com' },
    ]
    # json形式でusersを返す
    render json: users
  end
end
