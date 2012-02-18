class AddCompanyFieldsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :company_info, :text
    add_column :users, :company_name, :string
    add_column :users, :website_line, :string
    add_column :users, :logo, :string
    add_column :users, :contact_person_name, :string
    add_column :users, :contact_person_phone, :integer
    add_column :users, :city, :string
    add_column :users, :state, :string
    add_column :users, :zip, :int
  end
end
