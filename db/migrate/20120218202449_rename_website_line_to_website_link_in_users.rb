class RenameWebsiteLineToWebsiteLinkInUsers < ActiveRecord::Migration
  def change
    rename_column :users, :website_line, :website_link
  end
end
