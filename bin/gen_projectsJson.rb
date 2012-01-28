
require 'json'

def num(n) 
  return 10**(n-1) + rand(10**(n))
end

def string(n)
  return (0...n).map{97.+(rand(25)).chr}.join
end

def words(n) 
  return (0...n).map{string(1 + rand(5))}.join(' ')
end

def pledges(n)
  pledges = []
  n.times do 
    pledges.push({
      'uid'    => num(9),
      'name'   => 'Joe ' + string(7),
      'uname'  => 'joe' + string(4),
      'amount' => num(2)
    })
  end 
  return pledges
end

def tags(n) 
  tags = Array.new($tags)
  while (tags.length > n) 
    tags.delete_at(rand(tags.length)) 
  end
  return tags
end

$num = 50

$tags = %w(
  module
  WordPress
  dll
  git
  vision
  NodeJS
  Java
  JavaScript
  http
  android
  iOS
  jQuery
  c++
  OpenGL
  ruby
  oop
  Oracle
  MySQL
  rails
  haml
  python
  perl
  php  
)

$requests = []

$num.times do
  pledges = pledges(rand(20))
  pledgeTotal = 0
  pledges.each do |pledge| 
    pledgeTotal += pledge['amount'] 
  end
  $requests.push({
    'pid'     => num(9),
    'title'   => words(10),
    'brief'   => words(25),
    'detail'  => words(100),
    'pledges' => pledges,
    'tags'    => tags(10),
    'pledgeTotal' => pledgeTotal,
  })
end

print JSON.pretty_generate($requests)
