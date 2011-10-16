class AddCommunityToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :community, :string
  end
end
