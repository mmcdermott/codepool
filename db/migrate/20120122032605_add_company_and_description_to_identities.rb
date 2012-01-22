class AddCompanyAndDescriptionToIdentities < ActiveRecord::Migration
  def change
    add_column :identities, :company, :boolean
    add_column :identities, :description, :text
  end
end
