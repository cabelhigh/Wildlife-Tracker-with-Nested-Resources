class RemoveRegionFromSightings < ActiveRecord::Migration
  def change
    remove_column :sightings, :region
  end
end
