class AddTaxIdToUsers < ActiveRecord::Migration
  def change
    add_column :users, :tax_id, :integer
  end
end
