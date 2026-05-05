const EmissionenGrid = {
    props: {
        columns: Array,
        data: Array,
        filterKey: String,
        filterTyp: String,
        filterKontinent: String,
        minEmissionen: Number
    },
    data() {
        return {
            sortKey: '',
            sortOrders: this.columns.reduce((o, key) => ((o[key] = 1), o), {})
        }
    },
    computed: {
        filteredData() {
            const sortKey = this.sortKey
            const filterKey = this.filterKey && this.filterKey.toLowerCase()
            const order = this.sortOrders[sortKey] || 1
            let data = this.data
            //1. Suche
            if (filterKey) {
            data = data.filter((row) => {
                return Object.keys(row).some((key) => {
                return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                })
            })
            }
            //2. Sortierung
            if (sortKey) {
            data = data.slice().sort((a, b) => {
                a = a[sortKey]
                b = b[sortKey]
                return (a === b ? 0 : a > b ? 1 : -1) * order
            })
            } else {
                //Standard-Sortierung
                data = data.slice().sort((a, b) => {
                //Primär: Typ (Land vor Unternehmen)
                    if (a.Typ !== b.Typ) {
                    return a.Typ > b.Typ ? 1 : -1;
                }
                //Sekundär: Akteur alphabetisch
                return a.Akteur.localeCompare(b.Akteur);
            })
            }
            //3. Filter nach Typ
            if (this.filterTyp) {
            data = data.filter(row => row.Typ === this.filterTyp);
            }
            //4. Filter nach Kontinent
            if (this.filterKontinent) {
            data = data.filter(row => row.kontinent === this.filterKontinent);
            }
            //5. Range-Filter
            if (this.minEmissionen > 0) {
            data = data.filter(row => row.emissionen >= this.minEmissionen);
            }

            return data
        }
    },
    methods: {
        sortBy(key) {
            this.sortKey = key
            this.sortOrders[key] = this.sortOrders[key] * -1
        },
        capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
        },
        formatNumber(key) {
            if (typeof key === 'number') {
                return key.toLocaleString('de-DE');
            }
            return key;
    }
    },
    template: `
        <div class="table-container">
            <table v-if="filteredData.length" class="table is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th v-for="key in columns"
                            @click="sortBy(key)"
                            :class="{ active: sortKey == key }">
                            {{ capitalize(key) }}
                            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="entry in filteredData">
                        <td v-for="key in columns">
                        {{formatNumber(entry[key])}}
                        </td>
                    </tr>
                </tbody>
            </table>
            <p v-else>Keine Einträge gefunden.</p>
        </div>
    `
}

Vue.createApp({
    components: {
        EmissionenGrid
    },
    data(){
        return {
            searchQuery: '',
            filterTyp: '',
            filterKontinent: '',
            minEmissionen: 0,
            gridColumns: ['Akteur', 'emissionen', 'Typ', 'Region/Sitz'],
            gridData: [
            {'Akteur': "Argentinien", 'Typ': "Land", 'Region/Sitz': "Südamerika", emissionen: 171059260, kontinent: "Südamerika"},
            {'Akteur': "USA", 'Typ': "Land", 'Region/Sitz': "Nordamerika", emissionen: 4904120000, kontinent: "Nordamerika"},
            {'Akteur': "Schweden", 'Typ': "Land", 'Region/Sitz': "Europa", emissionen: 38096652, kontinent: "Europa"},
            {'Akteur': "Deutschland", 'Typ': "Land", 'Region/Sitz': "Europa", emissionen: 572319170, kontinent: "Europa"},
            {'Akteur': "Österreich", 'Typ': "Land", 'Region/Sitz': "Europa", emissionen: 56367656, kontinent: "Europa"},
            {'Akteur': "Belgien", 'Typ': "Land", 'Region/Sitz': "Europa", emissionen: 85456200, kontinent: "Europa"},
            {'Akteur': "Brasilien", 'Typ': "Land", 'Region/Sitz': "Südamerika", emissionen: 483011550, kontinent: "Südamerika"},
            {'Akteur': "Kanada", 'Typ': "Land", 'Region/Sitz': "Nordamerika", emissionen: 533340100, kontinent: "Nordamerika"},
            {'Akteur': "Chile", 'Typ': "Land", 'Region/Sitz': "Südamerika", emissionen:78725544, kontinent: "Südamerika"},
            {'Akteur': "China", 'Typ': "Land", 'Region/Sitz': "Asien", emissionen: 12289037000, kontinent: "Asien"},
            {'Akteur': "Kroatien", 'Typ': "Land", 'Region/Sitz': "Europa", emissionen: 18464850, kontinent: "Europa"},
            {'Akteur': "Dänemark", 'Typ': "Land", 'Region/Sitz': "Europa", emissionen: 28369162, kontinent: "Europa"},
            {'Akteur': "Finland", 'Typ': "Land", 'Region/Sitz': "Europa", emissionen: 29775000, kontinent: "Europa"},
            {'Akteur': "Frankreich", 'Typ': "Land", 'Region/Sitz': "Europa", emissionen: 264155620, kontinent: "Europa"},
            {'Akteur': "Indien", 'Typ': "Land", 'Region/Sitz': "Asien", emissionen: 3193478100, kontinent: "Asien"},
            {'Akteur': "Japan", 'Typ': "Land", 'Region/Sitz': "Asien", emissionen: 961867300, kontinent: "Asien"},
            {'Akteur': "Qatar", 'Typ': "Land", 'Region/Sitz': "Asien", emissionen: 125812260, kontinent: "Asien"},
            {'Akteur': "Schweiz", 'Typ': "Land", 'Region/Sitz': "Europa", emissionen: 32071708, kontinent: "Europa"},
            {'Akteur': "Angola", 'Typ': "Land", 'Region/Sitz': "Afrika", emissionen: 22333584, kontinent: "Afrika"},
            {'Akteur': "Australien", 'Typ': "Land", 'Region/Sitz': "Australien", emissionen: 386732380, kontinent: "Australien"},
            {'Akteur': "Neuseeland", 'Typ': "Land", 'Region/Sitz': "Australien", emissionen: 32479432, kontinent: "Australien"},
            {'Akteur': "Antarktis", 'Typ': "Land", 'Region/Sitz': "Antarktis", emissionen: 0, kontinent: "Antarktis"},
            {'Akteur': "Mexiko", 'Typ': "Land", 'Region/Sitz': "Nordamerika", emissionen: 460987650, kontinent: "Nordamerika"},
            {'Akteur': "Aramco", 'Typ': "Unternehmen", 'Region/Sitz': "Saudi Arabien", emissionen: 1839000000, kontinent: "Asien"},
            {'Akteur': "Coal India", 'Typ': "Unternehmen", 'Region/Sitz': "Indien", emissionen: 1548000000, kontinent: "Asien"},
            {'Akteur': "Shell", 'Typ': "Unternehmen", 'Region/Sitz': "Großbritannien", emissionen: 418000000, kontinent: "Europa"},
            {'Akteur': "BASF SE", 'Typ': "Unternehmen", 'Region/Sitz': "Deutschland", emissionen: 7350000, kontinent: "Europa"},
            {'Akteur': "ThyssenKrupp Stahl", 'Typ': "Unternehmen", 'Region/Sitz': "Deutschland", emissionen: 4690000, kontinent: "Europa"},
            {'Akteur': "CHN Energy", 'Typ': "Unternehmen", 'Region/Sitz': "China", emissionen: 153000000, kontinent: "Asien"},
            {'Akteur': "ExxonMobil", 'Typ': "Unternehmen", 'Region/Sitz': "USA", emissionen: 562000000, kontinent: "Nordamerika"},
            {'Akteur': "TotalEnergies", 'Typ': "Unternehmen", 'Region/Sitz': "Frankreich", emissionen: 359000000, kontinent: "Europa"},
            ]
        }
    }
}).mount('#app')