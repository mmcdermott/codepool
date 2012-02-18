class AddGithubLinkToUsers < ActiveRecord::Migration
  def change
    add_column :users, :github_link, :string
  end
end
