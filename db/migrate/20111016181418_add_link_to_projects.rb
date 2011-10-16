class AddLinkToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :original_issue, :string
  end
end
