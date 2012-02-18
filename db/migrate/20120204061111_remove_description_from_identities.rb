class RemoveDescriptionFromIdentities < ActiveRecord::Migration
  def change
    remove_column :identities, :company
    remove_column :identities, :description
  end
end
