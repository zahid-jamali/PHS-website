-- Create the mood enum type if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'mood') THEN
        CREATE TYPE mood AS ENUM ('energetic', 'relaxed', 'focused', 'creative', 'balanced', 'adventurous');
    END IF;
END$$;

-- Create the taste_profile enum type if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'taste_profile') THEN
        CREATE TYPE taste_profile AS ENUM ('mild', 'medium', 'strong', 'exotic', 'herbal', 'spicy', 'smoky', 'citrusy', 'floral');
    END IF;
END$$;

-- Create the salt_flavors table if it doesn't exist
CREATE TABLE IF NOT EXISTS salt_flavors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    taste_profile taste_profile NOT NULL,
    matching_moods mood[] NOT NULL,
    culinary_uses TEXT[],
    benefits_description TEXT,
    image_url TEXT NOT NULL,
    product_id INTEGER REFERENCES products(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample salt flavors
INSERT INTO salt_flavors (name, slug, description, taste_profile, matching_moods, culinary_uses, benefits_description, image_url, product_id)
VALUES
    ('Himalayan Pink Sea Salt', 'himalayan-pink-sea-salt', 'Our classic pink Himalayan salt with a pure, mild taste that enhances any dish.', 'mild', ARRAY['relaxed', 'focused']::mood[], ARRAY['seasoning', 'cooking', 'baking'], 'Rich in minerals, enhances hydration, supports electrolyte balance.', '/assets/salt-pink-classic.jpg', 1),
    
    ('Smoked Pink Salt', 'smoked-pink-salt', 'Oak-smoked Himalayan salt that adds a deep, aromatic dimension to grilled dishes and hearty meals.', 'smoky', ARRAY['creative', 'adventurous']::mood[], ARRAY['grilling', 'meat rubs', 'bbq'], 'Adds depth of flavor without artificial additives, mineral-rich.', '/assets/salt-smoked.jpg', 2),
    
    ('Pink Salt with Herbs', 'herbal-pink-salt', 'A fragrant blend of Himalayan salt with Mediterranean herbs for a burst of flavor.', 'herbal', ARRAY['energetic', 'creative']::mood[], ARRAY['finishing', 'vegetable dishes', 'salads'], 'Combined benefits of salt and herbs, enhanced digestive support.', '/assets/salt-herbal.jpg', 3),
    
    ('Spicy Pink Salt', 'spicy-pink-salt', 'Himalayan salt infused with cayenne and chili for those who love heat in every bite.', 'spicy', ARRAY['energetic', 'adventurous']::mood[], ARRAY['meat dishes', 'spicy cuisine', 'marinades'], 'Metabolism support, circulation enhancement, flavor intensity.', '/assets/salt-spicy.jpg', 4),
    
    ('Citrus Pink Salt', 'citrus-pink-salt', 'Bright and zesty Himalayan salt infused with natural lemon and lime essence.', 'citrusy', ARRAY['energetic', 'relaxed']::mood[], ARRAY['seafood', 'poultry', 'salad dressings'], 'Vitamin C enhancement, digestive aid, natural flavor brightener.', '/assets/salt-citrus.jpg', 5);