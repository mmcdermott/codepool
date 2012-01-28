class RenameProjectsToRequests < ActiveRecord::Migration
  def change
    rename_table :projects, :requests
    rename_column :donations, :project_id, :request_id
  end
end
