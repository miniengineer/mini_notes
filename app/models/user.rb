class User < ApplicationRecord
  has_many :notes
  validates :username, presence: true
  validates :email, presence: true
end
