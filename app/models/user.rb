class User < ApplicationRecord
  has_many :notes
  validate :username, presence: true
  validate :email, presence: true
end
