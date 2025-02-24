class AddBalanceToStampDownloads < ActiveRecord::Migration[8.0]
  def change
    add_column :stamp_downloads, :balance, :string
  end
end
