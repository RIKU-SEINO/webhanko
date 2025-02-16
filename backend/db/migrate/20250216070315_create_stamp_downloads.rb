class CreateStampDownloads < ActiveRecord::Migration[8.0]
  def change
    create_table :stamp_downloads do |t|
      t.string :stamp_category, null: false, default: ""
      t.string :stamp_type, null: false, default: ""
      t.string :engraving_type, null: false, default: ""
      t.string :font, null: false, default: ""
      
      t.string :text_1, null: true
      t.string :text_2, null: true
      t.string :text_3, null: true

      t.boolean :is_advanced, null: false, default: false

      t.references :user, null: true, foreign_key: true

      t.timestamps
    end
  end
end
