class CreateAuthorizations < ActiveRecord::Migration
  def change
    create_table :authorizations do |t|
      t.string :provider
      t.string :token
      t.integer :user_id
      t.integer :uid, :limit => 8
      t.timestamps
    end
  end
end
