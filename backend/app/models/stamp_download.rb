class StampDownload < ApplicationRecord
  belongs_to :user, optional: true # Guest users can also download stamps

  validates :stamp_category, presence: true
  validates :stamp_type, presence: true
  validates :engraving_type, presence: true
  validates :font, presence: true
  validates :balance, inclusion: { in: %w[large medium small] }
  validates :is_advanced, inclusion: { in: [true, false] }

  def advanced?
    is_advanced
  end
end
