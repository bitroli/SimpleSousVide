require 'rubygems'
require 'sinatra/base'
require 'json'
require 'SerialPort'

$modem = `/bin/ls /dev/tty*.usb*`[0..-2]
puts "Found arduino at [#{$modem}]"
$arduino = SerialPort.new($modem,115200, 8, 1 , SerialPort::NONE)

def readTemperature(scale = "C")
    puts "Reading the temp"
    $arduino.write "[READ_TEMPS,#{scale}]"
    puts "Ok, we wrote [READ_TEMPS,#{scale}] to the arduino."
    r = $arduino.read(1)
    s = r
    while s != ']' do
      s = $arduino.read(1)
      r += s
    end
    puts "We've just read *#{r}*"
    # here we should have something like [READ_TEMP,75.5,12]. 75.5 is current
    # 12 is target
    # we'll return just the 75.5
    r = r[1...-1].split(',')
    p r
    return {:temperature => r[1], :scale => scale, :target => r[2]}
end

def setTemperature(temperature)
  puts "Writing [SET_TEMP,#{temperature}]"
  $arduino.write "[SET_TEMP,#{temperature}]"
end

class SousVideServer < Sinatra::Base

  def initialize()
    super
  end

  configure do
    enable :lock
  end

  get '/' do
    erb :index
  end

  put '/setTemperature/:temp' do
    setTemperature(params[:temp])
    JSON.generate({:temperature => params[:temp]})
  end

  get '/readTemperature' do
    v = readTemperature()
    JSON.generate(v)
  end



end

sleep(5)
SousVideServer.run!
