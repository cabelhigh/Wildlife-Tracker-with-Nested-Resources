class SightingsController < ApplicationController
  before_action :set_sighting, only: [:show, :edit, :update, :destroy]

  # GET /sightings
  # GET /sightings.json
  def index
    @sightings = Sighting.all
    @animals = Animal.all
  end

  # GET /sightings/1
  # GET /sightings/1.json
  def show
  end

  # GET /sightings/new
  def new
    @sighting = Sighting.new
    @animals = Animal.all.map do |animal|
      [animal.name, animal.id]
    end
  end

  # GET /sightings/1/edit
  def edit
  end

  # POST /sightings
  # POST /sightings.json
  def create
    @sighting = Sighting.new(sighting_params)
    puts "LATITUDE #{@sighting.latitude}"
    respond_to do |format|
      if @sighting.save
        format.html { redirect_to @sighting, notice: 'Sighting was successfully created.' }
        format.json { render :show, status: :created, location: @sighting }
      else
        format.html { render :new }
        format.json { render json: @sighting.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sightings/1
  # PATCH/PUT /sightings/1.json
  def update
    respond_to do |format|
      if @sighting.update(sighting_params)
        format.html { redirect_to @sighting, notice: 'Sighting was successfully updated.' }
        format.json { render :show, status: :ok, location: @sighting }
      else
        format.html { render :edit }
        format.json { render json: @sighting.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sightings/1
  # DELETE /sightings/1.json
  def destroy
    @sighting.destroy
    respond_to do |format|
      format.html { redirect_to sightings_url, notice: 'Sighting was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def get_sightings
    @all_sightings = Sighting.all
    @hash = Gmaps4rails.build_markers(@all_sightings) do |sighting, marker|
      marker.lat(sighting.latitude)
      marker.lng(sighting.longitude)
      marker.infowindow(makeInfoWindow(sighting))
    end

    render json: @hash.to_json

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sighting
      @sighting = Sighting.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def sighting_params
      params.require(:sighting).permit(:date, :time, :latitude, :longitude, :animal_id)
    end

    def makeInfoWindow(sighting)
      "<div class='marker-window'>
        <p>On #{sighting.date.strftime('%a %b %d %Y')} at #{sighting.time.strftime('%I:%M%p')}</p>
        <p>#{Animal.find(sighting.animal_id).name} was spotted.</p>
      </div>"
    end
end
