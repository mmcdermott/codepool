class AddCompanyToIdentities < ActiveRecord::Migration
  def change
    add_column :identities, :company, :boolean
  end
end
