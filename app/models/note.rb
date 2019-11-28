class Note < ApplicationRecord
  belongs_to :user
  validate :title, presence: true
  validate :body
end
