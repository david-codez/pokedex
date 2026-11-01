
export const MAX_BASE_STAT = 255

export const cleanFlavorText = (flavorText) => {
    return flavorText
        .replace(/­\n/g, '')
        .replace(/[\f\n\r­]/g, ' ')
        .replace(/POKéMON/g, 'Pokémon')
        .replace(/\s+/g, ' ')
        .trim()
}

const findEnglishEntry = (entries) => entries.find((entry) => entry.language.name === 'en')

export const getPokemon = async (pokeId) => {
    const loadPoke = `https://pokeapi.co/api/v2/pokemon/${pokeId}`
    const loadDescription = `https://pokeapi.co/api/v2/pokemon-species/${pokeId}/`

    const [res, secondRes] = await Promise.all([fetch(loadPoke), fetch(loadDescription)])
    if (!res.ok || !secondRes.ok) {
        throw new Error(`PokeAPI answered ${res.status} / ${secondRes.status} for Pokémon #${pokeId}`)
    }
    const pokemon = await res.json()
    const species = await secondRes.json()

    const englishFlavor = findEnglishEntry(species.flavor_text_entries)
    const englishGenus = findEnglishEntry(species.genera)

    return {
        pokemon,
        description: englishFlavor ? cleanFlavorText(englishFlavor.flavor_text) : '',
        genus: englishGenus ? englishGenus.genus : '',
    }
}

export const getAllPokemon = async () => {
    let loadPoke = `https://pokeapi.co/api/v2/pokemon?limit=151`;
    let pokemon = []

    const res = await fetch(loadPoke)
    const data = await res.json()

    pokemon.push(data)

    return pokemon

}

export const calculateHeight = (height) => {
    //multipy height by four to convert decimeters to inches
    let heightString = ''
    let inches = height * 3.937
    let feet = Math.floor(inches / 12)

    inches = Math.floor(inches % 12)
    if(feet > 0) { heightString = `${feet} ft. ${inches} inches`}
    else { heightString = `${inches} inches`}

    return heightString

}

export const calculateWeight = (weight) => {
    //multiply by 3.5 to convert hectograms to ounces divide by 16 for pounds
    let ounces = weight * 3.5374
    let pounds = Math.floor(ounces / 16)
    ounces = pounds % 16
    let weightString = `${pounds} lbs. ${ounces} oz.`
    return weightString
}

export const metricHeight = (height) => `${(height / 10).toFixed(1)} m`
export const metricWeight = (weight) => `${(weight / 10).toFixed(1)} kg`

const STAT_LABELS = {
    'hp': 'HP',
    'attack': 'Attack',
    'defense': 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    'speed': 'Speed',
}

export const statLabel = (statName) => STAT_LABELS[statName] || statName

// TODO(design choice): the scale the bars are drawn against. The true ceiling is 255 (Blissey's HP),
// which keeps every Pokémon comparable but leaves typical stats (40-130) as short bars.
export const statBarPercent = (baseStat) => {
    return Math.min(baseStat / MAX_BASE_STAT, 1) * 100
}

export const threeDigitNumber = (pokeId) => {
    let number

    if(pokeId >= 100) number = pokeId.toString();
    else if(pokeId >= 10) number = '0' + pokeId.toString();
    else number = '00' + pokeId.toString();

    return number

}
