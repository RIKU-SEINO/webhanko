Rails.application.config.stamp_options = {

  stamp_categories: {
    personal: '個人印鑑',
    company: '法人印鑑',
    date: '日付印鑑',
  },

  stamp_types: {
	  personal: {
		  official: '実印',
		  approval: '認印',
		  shachihata: 'シャチハタ',
	  },
	  company: {
		  representative: '代表者印',
		  square: '角印',
	  },
	  date: {
		  circle: '丸印',
		  square: '角型'
	  },
  },

  engraving_types: {
	  personal: {
		  official: {
			  one_row: '横1列左読み',
			  one_row_old: '横1列右読み',
			  two_rows: '横2列',
			  one_col: '縦1列',
			  two_cols: '縦2列',
		  },
		  approval: {
			  one_row: '横1列左読み',
			  one_row_old: '横1列右読み',
			  two_rows: '横2列',
			  one_col: '縦1列',
			  two_cols: '縦2列',
		  },
		  shachihata: {
			  no_option: 'オプション無し',
		  },
	  },
	  company: {
		  representative: {
			  circle_center: '回文＋中文（おまかせ）',
			  circle_center_one_row: '回文＋中文（横1列）',
				circle_center_two_rows: '回文＋中文（横2列）',
			  no_circle: '回文無し（おまかせ）',
			  no_circle_one_row: '回文無し（横1列）',
			  no_circle_two_rows: '回文無し（横2列）',
		  },
		  square: {
			  row: '横彫り（おまかせ）',
			  one_row: '横1列',
			  two_rows: '横2列',
			  three_rows: '横3列',
			  col: '縦彫り（おまかせ）',
			  one_col: '縦1列',
			  two_cols: '縦2列',
			  three_cols: '縦3列',
		  },
	  },
	  date: {
			circle: {
				no_option: 'オプション無し',
			},
			square: {
				no_option: 'オプション無し',
			},
 	  },
  },

  engraving_text_titles: {
	  personal: {
		  official: {
			  one_row: ['彫刻名'],
			  one_row_old: ['彫刻名'],
			  two_rows: ['彫刻名(1列目)', '彫刻名(2列目)'],
			  one_col: ['彫刻名'],
			  two_cols: ['彫刻名(1列目)', '彫刻名(2列目)'],
		  },
		  approval: {
			  one_row: ['彫刻名'],
			  one_row_old: ['彫刻名'],
			  two_rows: ['彫刻名(1列目)', '彫刻名(2列目)'],
			  one_col: ['彫刻名'],
			  two_cols: ['彫刻名(1列目)', '彫刻名(2列目)'],
		  },
		  shachihata: {
			  no_option: ['彫刻名'],
		  },
	  },
	  company: {
		  representative: {
			  circle_center: ['彫刻名(回文)', '彫刻名(中文)'],
			  circle_center_one_row: ['彫刻名(回文)', '彫刻名(中文1列目)'],
				circle_center_two_rows: ['彫刻名(回文)', '彫刻名(中文1列目)', '彫刻名(中文2列目)'],
			  no_circle: ['彫刻名'],
			  no_circle_one_row: ['彫刻名(1列目)'],
			  no_circle_two_rows: ['彫刻名(中文1列目)', '彫刻名(中文2列目)'],
		  },
		  square: {
			  row: ['彫刻名'],
			  one_row: ['彫刻名(1列目)'],
			  two_rows: ['彫刻名(1列目)', '彫刻名(2列目)'],
			  three_rows: ['彫刻名(1列目)', '彫刻名(2列目)', '彫刻名(3列目)'],
			  col: ['彫刻名'],
			  one_col: ['彫刻名(1列目)'],
			  two_cols: ['彫刻名(1列目)', '彫刻名(2列目)'],
			  three_cols: ['彫刻名(1列目)', '彫刻名(2列目)', '彫刻名(3列目)'],
		  },
	  },
	  date: {
			circle: {
			  no_option: ['彫刻名'],
			},
			square: {
			  no_option: ['彫刻名'],
			},
 	  },
  },

	fonts: {
	  personal: {
		  official: {
			  insotai: '印相体',
				tenshotai: '篆書体',
			  kointai: '古印体',
			  reishotai: '隷書体',
			  gyoushotai: '行書体',
			  kaishotai: '楷書体',
		  },
		  approval: {
			  insotai: '印相体',
				tenshotai: '篆書体',
			  kointai: '古印体',
			  reishotai: '隷書体',
			  gyoushotai: '行書体',
			  kaishotai: '楷書体',
		  },
		  shachihata: {
			  no_option: 'オプション無し',
		  },
	  },
	  company: {
		  representative: {
			  insotai: '印相体',
				tenshotai: '篆書体',
			  kointai: '古印体',
			  reishotai: '隷書体',
			  gyoushotai: '行書体',
			  kaishotai: '楷書体',
		  },
		  square: {
			  insotai: '印相体',
				tenshotai: '篆書体',
			  kointai: '古印体',
			  reishotai: '隷書体',
			  gyoushotai: '行書体',
			  kaishotai: '楷書体',
		  },
	  },
	  date: {
			circle: {
			  insotai: '印相体',
				tenshotai: '篆書体',
			  kointai: '古印体',
			  reishotai: '隷書体',
			  gyoushotai: '行書体',
			  kaishotai: '楷書体',
			  minchotai: '明朝体',
			  square_gothic: '角ゴシック体',
			  circle_gothic: '丸ゴシック体',
			  bold_mincho: '太明朝体',
			  soushotai: '草書体',
			},
			square: {
			  insotai: '印相体',
				tenshotai: '篆書体',
			  kointai: '古印体',
			  reishotai: '隷書体',
			  gyoushotai: '行書体',
			  kaishotai: '楷書体',
			  minchotai: '明朝体',
			  square_gothic: '角ゴシック体',
			  circle_gothic: '丸ゴシック体',
			  bold_mincho: '太明朝体',
			  soushotai: '草書体',
			},
 	  },
  },

	balance: %w[large medium small],
}
