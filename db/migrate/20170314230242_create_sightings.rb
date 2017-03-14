class CreateSightings < ActiveRecord::Migration
  def change
    create_table :sightings do |t|
      t.string :date
      t.string :time
      t.string :latitude
      t.string :longitude
      t.references :animal, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
