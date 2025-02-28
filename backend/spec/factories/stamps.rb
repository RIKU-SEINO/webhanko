FactoryBot.define do
  factory :stamp do
    stamp_options = Rails.application.config.stamp_options

    stamp_category { stamp_options[:stamp_category].keys.sample }

    stamp_type { stamp_options[:stamp_type][stamp_category.to_sym].keys.sample }

    engraving_type { stamp_options[:engraving_type][stamp_category.to_sym][stamp_type.to_sym].keys.sample }

    font { stamp_options[:font][stamp_category.to_sym][stamp_type.to_sym].keys.sample }

    text_1 { Faker::Name.name }
    text_2 { Faker::Name.name }
    text_3 { Faker::Name.name }

    is_advanced { false }

    balance { %w[large medium small].sample }

    trait :advanced do
      is_advanced { true }
    end
  end
end
