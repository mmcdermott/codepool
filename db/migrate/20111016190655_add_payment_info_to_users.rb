class AddPaymentInfoToUsers < ActiveRecord::Migration
  def change
    add_column :users, :address, :string
    add_column :users, :paypal, :boolean
  end
end
