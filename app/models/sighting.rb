class Sighting < ActiveRecord::Base
  belongs_to :animal
  validates :date, :time, :animal_id, presence: true
end
