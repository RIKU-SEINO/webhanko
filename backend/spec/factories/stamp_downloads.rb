FactoryBot.define do
  factory :stamp_download do
    stamp_options = Rails.application.config.stamp_options

    stamp_category { stamp_options[:stamp_categories].keys.sample }

    stamp_type { stamp_options[:stamp_types][stamp_category.to_sym].keys.sample }

    engraving_type { stamp_options[:engraving_types][stamp_category.to_sym][stamp_type.to_sym].keys.sample }

    font { stamp_options[:fonts][stamp_category.to_sym][stamp_type.to_sym].keys.sample }

    text_1 { Faker::Name.name }
    text_2 { Faker::Name.name }
    text_3 { Faker::Name.name }

    is_advanced { false }

    balance { %w[large medium small].sample }

    association :user

    trait :advanced do
      is_advanced { true }
    end

    trait :with_no_user do
      association :user, factory: :user, strategy: :null
    end
  end
end
