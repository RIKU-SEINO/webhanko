class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :trackable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :stamp_downloads

  validates :email, presence: true, uniqueness: true
  validates :encrypted_password, presence: true
  validates :is_admin, inclusion: { in: [true, false] }

  def admin?
    is_admin
  end
end
