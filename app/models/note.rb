class Note < ApplicationRecord
  belongs_to :user
  validates :title, presence: true
  validates :body, presence: true, allow_blank: true
end
