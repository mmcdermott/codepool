class CreateSubmissions < ActiveRecord::Migration
  def change
    create_table :submissions do |t|
      t.string :pull_request_link
      t.boolean :accepted
      t.integer :request_id
      t.integer :user_id

      t.timestamps
    end
  end
end
