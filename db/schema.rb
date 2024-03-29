# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120219010626) do

  create_table "authorizations", :force => true do |t|
    t.string   "provider"
    t.string   "token"
    t.integer  "user_id"
    t.integer  "uid",        :limit => 8
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "donations", :force => true do |t|
    t.integer  "user_id"
    t.integer  "request_id"
    t.integer  "amount"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "identities", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "company"
  end

  create_table "requests", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.float    "price"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "status"
    t.string   "original_issue"
    t.string   "link"
    t.string   "community"
  end

  create_table "submissions", :force => true do |t|
    t.string   "pull_request_link"
    t.boolean  "accepted"
    t.integer  "request_id"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "taggings", :force => true do |t|
    t.integer  "tag_id"
    t.integer  "taggable_id"
    t.string   "taggable_type"
    t.integer  "tagger_id"
    t.string   "tagger_type"
    t.string   "context"
    t.datetime "created_at"
  end

  add_index "taggings", ["tag_id"], :name => "index_taggings_on_tag_id"
  add_index "taggings", ["taggable_id", "taggable_type", "context"], :name => "index_taggings_on_taggable_id_and_taggable_type_and_context"

  create_table "tags", :force => true do |t|
    t.string "name"
  end

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "encrypted_password"
    t.string   "salt"
    t.string   "stripe_token"
    t.boolean  "admin"
    t.string   "address"
    t.boolean  "paypal"
    t.string   "avatar"
    t.text     "description"
    t.integer  "tax_id"
    t.boolean  "company"
    t.text     "company_info"
    t.string   "company_name"
    t.string   "website_link"
    t.string   "logo"
    t.string   "contact_person_name"
    t.integer  "contact_person_phone"
    t.string   "city"
    t.string   "state"
    t.integer  "zip"
    t.string   "github_link"
  end

end
