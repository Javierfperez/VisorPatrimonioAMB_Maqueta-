require([
    "esri/config",
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/FeatureLayer",
    "esri/widgets/LayerList",
    "esri/core/Collection",
    "esri/layers/GroupLayer",
    "esri/widgets/BasemapToggle",
    "esri/widgets/BasemapGallery",
    "esri/layers/SubtypeGroupLayer",
    "esri/rest/locator",
    "esri/widgets/Expand",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/widgets/Locate",
    "esri/widgets/Search",
    "esri/geometry/geometryEngine",
    "esri/widgets/Sketch",
    "esri/layers/MapImageLayer",
    "esri/widgets/Legend",
    "esri/layers/VectorTileLayer",
    "esri/Basemap",
    "esri/layers/WMSLayer",
    "esri/views/MapView",
    "esri/symbols/WebStyleSymbol",
    "esri/rest/support/TopFeaturesQuery",
    "esri/rest/support/TopFilter",
    "esri/widgets/Bookmarks",
    "esri/widgets/TimeSlider",
    "esri/views/MapView",
    "esri/WebMap",
    "esri/core/lang",
    "esri/core/promiseUtils",
    "esri/core/watchUtils",
    "esri/webmap/Bookmark",
    "esri/layers/GeoJSONLayer",
    "esri/layers/WMTSLayer",
    "esri/widgets/BasemapGallery/support/PortalBasemapsSource",
    "esri/portal/Portal",
    "esri/widgets/BasemapGallery/support/LocalBasemapsSource",
    "esri/layers/TileLayer",
    "esri/widgets/BasemapLayerList"

], (esriConfig, Map, SceneView, FeatureLayer, LayerList, Collection, GroupLayer, BasemapToggle, BasemapGallery, SubtypeGroupLayer, locator, Expand, Graphic, GraphicsLayer, Locate, Search, geometryEngine, Sketch, MapImageLayer, Legend, VectorTileLayer, Basemap, WMSLayer, MapView, WebStyleSymbol, TopFeaturesQuery,
    TopFilter, Bookmarks, TimeSlider, WebMap, lang, promiseUtils,
    watchUtils, Bookmark, GeoJSONLayer, WMTSLayer, PortalBasemapsSource, Portal, LocalBasemapsSource, TileLayer, BasemapLayerList) => {

    // esriConfig.apiKey = "AAPK7688e1bd2a704c0db649623111c12a47qvDbZks3Vflh2z834jxFsJJ9YcT9MVhJPTozqpdL8MOrUBro5JOFneewOMFegjcP";
    const trailheadsRenderer = { //Industrial
        "type": "simple",
        "symbol": {
            "type": "simple-marker",
            "size": "3",
            "color": "yellow",
            "outline": {
                "width": "0.5",
                "color": "yellow"
            },
        }
    }
    const trailheadsRenderer3 = { //Residencial Disperso
        "type": "simple",
        "symbol": {
            "type": "simple-marker",
            "size": "3",
            "color": "purple",
            "outline": {
                "width": "0.5",
                "color": "purple"
            },
        }
    }
    const trailheadsRenderer2 = { //Equipamientos
        "type": "simple",
        "symbol": {
            "type": "simple-marker",
            "size": "3",
            "color": "lightgreen",
            "outline": {
                "width": "0.5",
                "color": "lightgreen"
            },
        }
    }
    const trailheadsRenderer4 = { //Masias
        "type": "simple",
        "symbol": {
            "type": "simple-marker",
            "size": "3",
            "color": "darkgreen",
            "outline": {
                "width": "0.5",
                "color": "darkgreen"
            },
        }
    }
    const trailheadsLabels = {
        symbol: {
            type: "text",
            color: "#FFFFFF",
            haloColor: "#5E8D74",
            haloSize: "2px",
            font: {
                size: "12px",
                family: "Noto Sans",
                style: "italic",
                weight: "normal"
            }
        },
        labelPlacement: "above-center",
        labelExpressionInfo: {
            expression: "$feature.Alpha_Nom"
        }
    };
    const popupTrailheads = {
        "title": "{NOM}",
        "content": "<b>Municipio:</b> {MUNICIPI}<br><b>Periodo Temporal:</b> {ETAPA}<br><b>Tipología Básica: </b> {CATEGORIA}<br><b>Tipología Concreta: </b> {SUBCATEGORIA}<br><b>Procedencia:</b> {PROCEDENCIA}<br><b>Descipción:</b> {DESCRIPCIO}<br>"
    }


    const MapaBaseNegro = new VectorTileLayer({ //Capa Base Oscura
        url: "https://basemaps-api.arcgis.com/arcgis/rest/services/styles/99d4fe77daac45cbb2e13b99a0b54e28?type=style&token=AAPK46b7be06437644ed99e1769381aa9ae9Wv_wW_6JLI4Y7bzH39tNkAoIyL51iUEbCdw-V8lb2T2zDJgcFy_zFX3Mbd927nsp",
        visible: true,
        title: "Mapa Base Negro"
    });

    // let MapaBaseNegro = new TileLayer({
    //     url: "https://basemaps-api.arcgis.com/arcgis/rest/services/styles/99d4fe77daac45cbb2e13b99a0b54e28?type=style&token=AAPK46b7be06437644ed99e1769381aa9ae9Wv_wW_6JLI4Y7bzH39tNkAoIyL51iUEbCdw-V8lb2T2zDJgcFy_zFX3Mbd927nsp"
    //   });

    esriConfig.apiKey = "AAPK46b7be06437644ed99e1769381aa9ae9Wv_wW_6JLI4Y7bzH39tNkAoIyL51iUEbCdw-V8lb2T2zDJgcFy_zFX3Mbd927nsp";

    // const layer = new FeatureLayer({
    //     url: "https://services.arcgis.com/fwF8e4aLR6TRWtqM/arcgis/rest/services/Capa_Test/FeatureServer/0",
    //     outFields: ["Alpha", "Alpha_Muni", "Alpha_Nom", "Alpha_Tip1", "Alpha_Tip2", "Alpha_Fech", "Alpha_Obse", "Alpha_Code", "Beta_Tip1", "Beta_Tip2", "Beta_Fech"],
    //     visible: true
    // });
























    //AQUI SE CARGAN LAS CAPAS DE NUEVO, DE FORMA PREVIA AL ESPACIO MAP
    //INDUSTRIALS    https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/3 
    const Altres1 = new FeatureLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/3", //La url del servisio del que llega la capa. 
        outFields: ["*"], //Aquí se establecen los campos que lee de la fuente de datos, si pone un asterisco, lee todos ellos. 
        title: "Altres Elements Industrials", //El Título que se le ha dado a la capa y lo que se verá en el LayerList, se puede modificar.
        popupTemplate: popupTrailheads, //Este atributo es general para todas las capas, La estructura del popup se establece en una variable establecida previamente. 
        renderer: trailheadsRenderer, //El atributo renderen hace alusión a la visualización, es decir, a la simbología de la capa. 
        visible: true, //en función de si queremos visualizar directamente la imagen (ojo abierto), aunque luego se puede modificar poniendo en false el LayerGroup
        visibilityMode: "independent", //independiente para cambiarlo https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GroupLayer.html#visibilityMode
        definitionExpression: "SUBCATEGORIA = 'Altres industrials' OR SUBCATEGORIA = 'Guixera'OR SUBCATEGORIA = 'Pou de glaç' OR SUBCATEGORIA = 'Secador'OR SUBCATEGORIA = 'Transporte'" //En este espacio aparece la definición base, es decir, la lectura de la IDE lo hace filtrando directamente.
    });
    // map.add(Altres1);
    const Fàbriques = new FeatureLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/3",
        outFields: ["*"],
        title: "Fàbriques",
        popupTemplate: popupTrailheads,
        renderer: trailheadsRenderer,
        visible: true,
        visibilityMode: "independent",
        definitionExpression: "SUBCATEGORIA = 'Fàbrica' OR SUBCATEGORIA = 'Fàbrica d''olis i sabons' OR SUBCATEGORIA = 'Fàbrica de gel' OR SUBCATEGORIA = 'Fundició' OR SUBCATEGORIA = 'Indústria metàl·lica' OR SUBCATEGORIA = 'Indústria química'"
    });
    // map.add(Fàbriques);
    const Canteras = new FeatureLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/3",
        outFields: ["*"],
        title: "Minas y Canteras",
        popupTemplate: popupTrailheads,
        renderer: trailheadsRenderer,
        visible: true,
        visibilityMode: "independent",
        definitionExpression: "SUBCATEGORIA = 'Cantera' OR SUBCATEGORIA = 'Mina'"
    });
    // map.add(Canteras);

    const Bòbilas = new FeatureLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/3",
        outFields: ["*"],
        title: "Bòbilas/Teulars",
        popupTemplate: popupTrailheads,
        renderer: trailheadsRenderer,
        visible: true,
        visibilityMode: "independent",
        definitionExpression: "SUBCATEGORIA = 'Bòbila/Teular'"
    });
    // map.add(Bòbilas);
    const Forns = new FeatureLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/3",
        outFields: ["*"],
        title: "Forns",
        popupTemplate: popupTrailheads,
        renderer: trailheadsRenderer,
        visible: true,
        visibilityMode: "independent",
        definitionExpression: "SUBCATEGORIA = 'Forn'"
    });
    // map.add(Forns);
    const MinesyPedreres = new FeatureLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/3",
        outFields: ["*"],
        title: "Magatzems",
        popupTemplate: popupTrailheads,
        renderer: trailheadsRenderer,
        visible: true,
        visibilityMode: "independent",
        definitionExpression: "SUBCATEGORIA = 'Magatzem'"
    });
    // map.add(MinesyPedreres);
    const Molins = new FeatureLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/3",
        outFields: ["*"],
        title: "Molins",
        popupTemplate: popupTrailheads,
        renderer: trailheadsRenderer,
        visible: true,
        visibilityMode: "independent",
        definitionExpression: "SUBCATEGORIA = 'Molí'"
    });
    // map.add(Molins);
    const Textil = new FeatureLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/3",
        outFields: ["*"],
        title: "Indústria tèxtil",
        popupTemplate: popupTrailheads,
        renderer: trailheadsRenderer,
        visible: true,
        visibilityMode: "independent",
        definitionExpression: "SUBCATEGORIA = 'Indústria tèxtil'"
    });
    // map.add(Textil);

    //EQUIPAMIENTOS    https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/1
    const Altres2 = new FeatureLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/1",
        outFields: ["*"],
        title: "Altres Equipaments",
        popupTemplate: popupTrailheads,
        renderer: trailheadsRenderer3,
        visible: true,
        visibilityMode: "independent",
        definitionExpression: "SUBCATEGORIA = 'Altres equipaments' OR SUBCATEGORIA = 'Estació ferrocarril/tramvia' OR SUBCATEGORIA = 'Estació ferrocarrils/tramvia'"
    });
    // map.add(Altres2);
    const VidaAssociativaCulturalLleure = new FeatureLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/1",
        outFields: ["*"],
        title: "Vida Associativa/Cultural/Lleure",
        popupTemplate: popupTrailheads,
        renderer: trailheadsRenderer3,
        visible: true,
        visibilityMode: "independent",
        definitionExpression: "SUBCATEGORIA = 'Vida associativa/Cultural/Lleure'"
    });
    // map.add(VidaAssociativaCulturalLleure);
    const Religios = new FeatureLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/1",
        outFields: ["*"],
        title: "Religiós",
        popupTemplate: popupTrailheads,
        renderer: trailheadsRenderer3,
        visible: true,
        visibilityMode: "independent",
        definitionExpression: "SUBCATEGORIA = 'Religiós'"
    });
    // map.add(Religios);
    const Mercats = new FeatureLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/1",
        outFields: ["*"],
        title: "Mercats",
        popupTemplate: popupTrailheads,
        renderer: trailheadsRenderer3,
        visible: true,
        visibilityMode: "independent",
        definitionExpression: "SUBCATEGORIA = 'Mercats'"
    });
    // map.add(Mercats);
    const Sanitaris = new FeatureLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/1",
        outFields: ["*"],
        title: "Hospitalaris / Assistencials",
        popupTemplate: popupTrailheads,
        renderer: trailheadsRenderer3,
        visible: true,
        visibilityMode: "independent",
        definitionExpression: "SUBCATEGORIA = 'Hospitalaris/Assistencials'"
    });
    // map.add(Sanitaris);
    const Escortxadors = new FeatureLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/1",
        outFields: ["*"],
        title: "Escortxadors",
        popupTemplate: popupTrailheads,
        renderer: trailheadsRenderer3,
        visible: true,
        visibilityMode: "independent",
        definitionExpression: "SUBCATEGORIA = 'Escortxador' OR SUBCATEGORIA = 'Escortxadors'"
    });
    // map.add(Escortxadors);
    const Escoles = new FeatureLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/1",
        outFields: ["*"],
        title: "Escoles",
        popupTemplate: popupTrailheads,
        renderer: trailheadsRenderer3,
        visible: true,
        visibilityMode: "independent",
        definitionExpression: "SUBCATEGORIA = 'Escoles'"
    });
    // map.add(Escoles);
    const Cementiris = new FeatureLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/1",
        outFields: ["*"],
        title: "Cementiris",
        popupTemplate: popupTrailheads,
        renderer: trailheadsRenderer3,
        visible: true,
        visibilityMode: "independent",
        definitionExpression: "SUBCATEGORIA = 'Cementiris'"
    });
    // map.add(Cementiris);
    const Ajuntaments = new FeatureLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/1",
        outFields: ["*"],
        title: "Ajuntaments",
        popupTemplate: popupTrailheads,
        renderer: trailheadsRenderer3,
        visible: true,
        visibilityMode: "independent",
        definitionExpression: "SUBCATEGORIA = 'Ajuntaments'"
    });

    const ActivitatEconomica = new FeatureLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/1",
        outFields: ["*"],
        title: "Activitat econòmica",
        popupTemplate: popupTrailheads,
        renderer: trailheadsRenderer3,
        visible: true,
        visibilityMode: "independent",
        definitionExpression: "SUBCATEGORIA = 'Activitat econòmica'"
    });
    const Safareig = new FeatureLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/1",
        outFields: ["*"],
        title: "Safareig",
        popupTemplate: popupTrailheads,
        renderer: trailheadsRenderer3,
        visible: true,
        visibilityMode: "independent",
        definitionExpression: "SUBCATEGORIA = 'Safareig'"
    });


    //MASIAS //   https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/2 (Masias)
    const Mas = new FeatureLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/2",
        outFields: ["*"],
        title: "Masies",
        popupTemplate: popupTrailheads,
        renderer: trailheadsRenderer4,
        visible: true,
        visibilityMode: "independent", //independiente para cambiarlo https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GroupLayer.html#visibilityMode
        definitionExpression: "SUBCATEGORIA = 'Masies' OR SUBCATEGORIA = 'Activitat econòmica' OR SUBCATEGORIA = 'Ajuntaments'OR SUBCATEGORIA = 'Altres industrials'OR SUBCATEGORIA = 'Escoles'OR SUBCATEGORIA = 'Escortxador'OR SUBCATEGORIA = 'Hospitalaris/Assistencials'OR SUBCATEGORIA = 'Mercats'OR SUBCATEGORIA = 'Safareig'OR SUBCATEGORIA = 'Vida associativa/Cultural/Lleure'"
    });
    // map.add(Mas);

    //ALTRES RESIDENCIALS  https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/4
    const Altres3 = new FeatureLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer/4",
        outFields: ["*"],
        title: "Altres Residencials",
        popupTemplate: popupTrailheads,
        renderer: trailheadsRenderer2,
        visible: true,
        visibilityMode: "independent",
        definitionExpression: "SUBCATEGORIA = 'Masies' OR SUBCATEGORIA = 'Palau' OR SUBCATEGORIA = 'Activitat econòmica' OR SUBCATEGORIA = 'Residencial'"
    });
    // map.add(Altres3);


    const Cartografia_Base = new MapImageLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer",
        visible: false,
        title: "Poligonación Histórica",
        sublayers: [{
            id: 6,
            visible: true,
            title: "Martorell"
        }, {
            id: 8,
            visible: true,
            title: "Limits urbans sXIX"
        }, {
            id: 9,
            visible: true,
            title: "Nuclis IGN"
        }, {
            id: 10,
            visible: true,
            title: "Cadastre Dispers",
            renderer: {
                type: "simple",
                symbol: {
                    type: "polygon",
                    color: [255, 0, 0],

                }
            }
        }, {
            id: 7,
            visible: true,
            title: "Amillaraments",
            renderer: {
                type: "simple",
                symbol: {
                    type: "polygon",
                    color: [0, 255, 255],
                }
            }
        }],
        // expanded: true
    });

    const map = new Map({
        basemap: {
            baseLayers: [MapaBaseNegro]
        },
        layers: [Altres1, Fàbriques, Canteras, Bòbilas, Forns, MinesyPedreres, Molins, Textil,
            Altres2, VidaAssociativaCulturalLleure, Religios, Mercats, Sanitaris, Escortxadors, Escoles, Cementiris, Ajuntaments, ActivitatEconomica, Safareig,
            Mas, Cartografia_Base, Altres3
        ]
    });
    const view = new SceneView({
        container: "viewDiv",
        map: map,
        camera: {
            position: {
                x: 2.043322,
                y: 41.391774,
                z: 80000,
                spatialReference: {
                    wkid: 4326
                }
            },
            heading: -45,
            tilt: 0,
        },
        slider: false,
        padding: {
            right: 0
        }
    });




    // let basemap = new Basemap({
    //     portalItem: {
    //         id: "99d4fe77daac45cbb2e13b99a0b54e28" // id del mapa
    //     }
    // });
    // let basemapGallery = new BasemapGallery({
    //     source: new LocalBasemapsSource({
    //         basemaps: [
    //             Basemap.fromId("MAPABASE"), // create a basemap from a well known id
    //             basemap
    //         ]
    //     }),
    //     view: view,
    //     visible: false
    // });
    // view.ui.add(basemapGallery, {
    //     position: "bottom-left"
    // });

    // const portal = new Portal();
    // const source = new PortalBasemapsSource({
    //     portal,
    //     query: {
    //         id: "99d4fe77daac45cbb2e13b99a0b54e28"
    //     }
    // });
    // const bgExpand = new Expand({
    //     view,
    //     content: new BasemapGallery({MapaBaseNegro}),
    //     expandIconClass: "esri-icon-basemap"
    // });
    // view.ui.add(bgExpand, "bottom-left");



















    //CAMBIAR EL MAPABASE
    const basemapToggle = new BasemapToggle({
        view: view,
        nextBasemap: "satellite"
    });
    view.ui.add(basemapToggle, {
        position: "bottom-left"
    });

    //LEYENDA
    const legend = new Legend({
        view: view,
        style: "classic"
    });
    view.ui.add(new Expand({
        view,
        content: legend
    }), "bottom-right");


    //LISTADO DE CAPAS
    const layerList = new LayerList({
        view: view,
        // container: "Prueba_Css",
        visible: true,
        // listItemCreatedFunction: (event) => {
        //     const item = event.item;
        //     if (item.layer.type != "group") {
        //         // don't show legend twice
        //         item.panel = {
        //             content: "legend",
        //             open: false
        //         };
        //     }
        // }
    });
    const llExpand = new Expand({
        view: view,
        content: layerList,
        expanded: true //Cambiar la layerList para que este expandida o no
    });
    view.ui.add(llExpand, "top-right");


    //CARGA DE LOS MAPAS BASE
    // const Minutas = new FeatureLayer({
    //     url: "https://services.arcgis.com/fwF8e4aLR6TRWtqM/arcgis/rest/services/minutas_actual/FeatureServer",
    //     visible: false,
    //     opacity: 0.8,
    //     title: "Nuclis IGN"
    // });
    // map.add(Minutas);

    var Minutas_AMB = new MapImageLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/00_Minutes_Teresa/MapServer",
        // sublayers: [{
        //     id: 9,
        //     title: "Minutas",
        //     visible: true,
        //     renderer: {
        //         type: "simple", // autocasts as new SimpleRenderer()
        //         symbol: {
        //             type: "Polygon", // autocasts as new SimpleMarkerSymbol()
        //             size: 3,
        //             color: "purple"
        //         },
        //     }

        // }, {
        //     id: 10,
        //     renderer: {
        //         type: "simple", // autocasts as new SimpleRenderer()
        //         symbol: {
        //             type: "Polygon", // autocasts as new SimpleMarkerSymbol()
        //             size: 3,
        //             color: "orange"
        //         }
        //     },
        //     title: "Cadastre de Rústica",
        //     visible: true
        // }],
        opacity: 1,
        title: "Mapa Minutas AMB",
        visible: false
    });
    map.add(Minutas_AMB);


    // var PATRIMONI = new MapImageLayer({
    //     url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_historics_sXX_3857/MapServer",
    //     opacity: 1,
    //     title: "Patrimoni 1",
    //     visible: false
    // });
    // map.add(PATRIMONI);

    // var PATRIMONI2 = new MapImageLayer({
    //     url: "https://ide.amb.cat/geoserveispi/rest/services/SIET/Elements_sXX/MapServer",
    //     opacity: 1,
    //     title: "Patrimoni 2",
    // });
    // map.add(PATRIMONI2);
















    var Limun = new MapImageLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/base_LimitMunicipis/MapServer",
        sublayers: [{
            id: 1,
            visible: true
        }],
        opacity: 0.5,
        visible: false,
        title: "Limites Municipales"
    });
    map.add(Limun);
    var Camins = new MapImageLayer({
        url: "https://ide.amb.cat/geoserveispi/rest/services/Webmap_camins_carreteres_historiques/MapServer",
        sublayers: [{
            id: 47,
            title: "Caminos Históricos",
            opacity: 0.2
        }, {
            id: 48,
            title: "Carreteras históricas",
            opacity: 0.7
        }],
        visible: false,
        title: "Carreteras y Caminos Históricos",
    });
    map.add(Camins);


    //LOCALIZAR LA UBICACIÓN
    const local = new Locate({
        view: view,
        useHeadingEnabled: false,
        goToOverride: function(view, options) {
            options.target.scale = 1500;
            return view.goTo(options.target);
        }
    });
    view.ui.add(local, "top-left");
    //BUSCADOR DE DIRECCIONES
    const buscarEndereco = new Search({
        view: view
    });
    const buscarenderecoExpand = new Expand({
        view: view,
        content: buscarEndereco
    })
    view.ui.add(buscarenderecoExpand, "top-left");

    const layersGroup = new GroupLayer({
        title: "Industrials",
        layers: [Altres1, Fàbriques, Canteras, Bòbilas, Forns, MinesyPedreres, Molins, Textil],
        visible: true
    })
    const layersGroup2 = new GroupLayer({
        title: "Equipaments",
        layers: [Altres2, VidaAssociativaCulturalLleure, Religios, Mercats, Sanitaris, Escortxadors, Escoles, Cementiris, Ajuntaments, ActivitatEconomica, Safareig, ],
        visible: true
    })
    const layersGroup4 = new GroupLayer({
        title: "Masies",
        layers: [Mas],
        visible: true
    })

    const seasonsNodes = document.querySelectorAll(`.season-item`);
    const seasonsElement = document.getElementById("seasons-filter");
    seasonsElement.addEventListener("click", filterBySeason);

    function filterBySeason(event) {
        const selectedSeason = event.target.getAttribute("data-season");
        floodLayerView.filter = {
            where: "ETAPA = " + selectedSeason + ""
        };
        floodLayerView2.filter = {
            where: "ETAPA = " + selectedSeason + ""
        };
        floodLayerView3.filter = {
            where: "ETAPA = " + selectedSeason + ""
        };
        floodLayerView4.filter = {
            where: "ETAPA = " + selectedSeason + ""
        };
        floodLayerView5.filter = {
            where: "ETAPA = " + selectedSeason + ""
        };
        floodLayerView6.filter = {
            where: "ETAPA = " + selectedSeason + ""
        };
        floodLayerView7.filter = {
            where: "ETAPA = " + selectedSeason + ""
        };
        floodLayerView8.filter = {
            where: "ETAPA = " + selectedSeason + ""
        };
        floodLayerView9.filter = {
            where: "ETAPA = " + selectedSeason + ""
        };
        floodLayerView10.filter = {
            where: "ETAPA = " + selectedSeason + ""
        };
        floodLayerView11.filter = {
            where: "ETAPA = " + selectedSeason + ""
        };
        floodLayerView12.filter = {
            where: "ETAPA = " + selectedSeason + ""
        };
        floodLayerView13.filter = {
            where: "ETAPA = " + selectedSeason + ""
        };
        floodLayerView14.filter = {
            where: "ETAPA = " + selectedSeason + ""
        };
        floodLayerView15.filter = {
            where: "ETAPA = " + selectedSeason + ""
        };
        floodLayerView16.filter = {
            where: "ETAPA = " + selectedSeason + ""
        };
        floodLayerView17.filter = {
            where: "ETAPA = " + selectedSeason + ""
        };
        floodLayerView18.filter = {
            where: "ETAPA = " + selectedSeason + ""
        };
        floodLayerView19.filter = {
            where: "ETAPA = " + selectedSeason + ""
        };
        floodLayerView20.filter = {
            where: "ETAPA = " + selectedSeason + ""
        };
        floodLayerView21.filter = {
            where: "ETAPA = " + selectedSeason + ""
        };
    }
    const seasonsExpand = new Expand({
        view: view,
        content: seasonsElement,
        expandIconClass: "esri-icon-filter",
        group: "top-right",
        visible: true,
        expanded: true
    });;
    view.whenLayerView(Altres1).then((layerView) => {
        floodLayerView = layerView;
        seasonsElement.style.visibility = "visible";
    });
    view.whenLayerView(Fàbriques).then((layerView1) => {
        floodLayerView1 = layerView1;
        seasonsElement.style.visibility = "visible";
    });
    view.whenLayerView(Canteras).then((layerView2) => {
        floodLayerView2 = layerView2;
        seasonsElement.style.visibility = "visible";
    });
    view.whenLayerView(Bòbilas).then((layerView3) => {
        floodLayerView3 = layerView3;
        seasonsElement.style.visibility = "visible";
    });
    view.whenLayerView(Forns).then((layerView4) => {
        floodLayerView4 = layerView4;
        seasonsElement.style.visibility = "visible";
    });
    view.whenLayerView(MinesyPedreres).then((layerView5) => {
        floodLayerView5 = layerView5;
        seasonsElement.style.visibility = "visible";
    });
    view.whenLayerView(Molins).then((layerView6) => {
        floodLayerView6 = layerView6;
        seasonsElement.style.visibility = "visible";
    });
    view.whenLayerView(Textil).then((layerView7) => {
        floodLayerView7 = layerView7;
        seasonsElement.style.visibility = "visible";
    });
    view.whenLayerView(Altres2).then((layerView8) => {
        floodLayerView8 = layerView8;
        seasonsElement.style.visibility = "visible";
    });
    view.whenLayerView(VidaAssociativaCulturalLleure).then((layerView9) => {
        floodLayerView9 = layerView9;
        seasonsElement.style.visibility = "visible";
    });
    view.whenLayerView(Religios).then((layerView10) => {
        floodLayerView10 = layerView10;
        seasonsElement.style.visibility = "visible";
    });
    view.whenLayerView(Sanitaris).then((layerView11) => {
        floodLayerView11 = layerView11;
        seasonsElement.style.visibility = "visible";
    });
    view.whenLayerView(Escortxadors).then((layerView12) => {
        floodLayerView12 = layerView12;
        seasonsElement.style.visibility = "visible";
    });
    view.whenLayerView(Escoles).then((layerView13) => {
        floodLayerView13 = layerView13;
        seasonsElement.style.visibility = "visible";
    });
    view.whenLayerView(Cementiris).then((layerView14) => {
        floodLayerView14 = layerView14;
        seasonsElement.style.visibility = "visible";
    });
    view.whenLayerView(Ajuntaments).then((layerView15) => {
        floodLayerView15 = layerView15;
        seasonsElement.style.visibility = "visible";
    });
    view.whenLayerView(ActivitatEconomica).then((layerView16) => {
        floodLayerView16 = layerView16;
        seasonsElement.style.visibility = "visible";
    });
    view.whenLayerView(Safareig).then((layerView17) => {
        floodLayerView17 = layerView17;
        seasonsElement.style.visibility = "visible";
    });
    view.whenLayerView(Mas).then((layerView18) => {
        floodLayerView18 = layerView18;
        seasonsElement.style.visibility = "visible";
    });
    view.whenLayerView(Altres3).then((layerView19) => {
        floodLayerView19 = layerView19;
        seasonsElement.style.visibility = "visible";
    });


    seasonsExpand.watch("expanded", () => {
        if (!seasonsExpand.expanded) {
            floodLayerView.filter = null;
        }
        if (!seasonsExpand.expanded) {
            floodLayerView1.filter = null;
        }
        if (!seasonsExpand.expanded) {
            floodLayerView2.filter = null;
        }
        if (!seasonsExpand.expanded) {
            floodLayerView3.filter = null;
        }
        if (!seasonsExpand.expanded) {
            floodLayerView4.filter = null;
        }
        if (!seasonsExpand.expanded) {
            floodLayerView5.filter = null;
        }
        if (!seasonsExpand.expanded) {
            floodLayerView6.filter = null;
        }
        if (!seasonsExpand.expanded) {
            floodLayerView7.filter = null;
        }
        if (!seasonsExpand.expanded) {
            floodLayerView8.filter = null;
        }
        if (!seasonsExpand.expanded) {
            floodLayerView9.filter = null;
        }
        if (!seasonsExpand.expanded) {
            floodLayerView10.filter = null;
        }
        if (!seasonsExpand.expanded) {
            floodLayerView11.filter = null;
        }
        if (!seasonsExpand.expanded) {
            floodLayerView12.filter = null;
        }
        if (!seasonsExpand.expanded) {
            floodLayerView13.filter = null;
        }
        if (!seasonsExpand.expanded) {
            floodLayerView14.filter = null;
        }
        if (!seasonsExpand.expanded) {
            floodLayerView15.filter = null;
        }
        if (!seasonsExpand.expanded) {
            floodLayerView16.filter = null;
        }
        if (!seasonsExpand.expanded) {
            floodLayerView17.filter = null;
        }
        if (!seasonsExpand.expanded) {
            floodLayerView18.filter = null;
        }
        if (!seasonsExpand.expanded) {
            floodLayerView19.filter = null;
        }
    })
    view.ui.add(seasonsExpand, "top-right");
    // map.add(CartoBase);
    map.add(layersGroup);
    map.add(layersGroup2);
    // map.add(layersGroup3);
    map.add(layersGroup4);
    // map.add(Limun_Grup);












    // view.ui.add("titleDiv", "top-right");
    // let basemapGallery = new BasemapGallery({
    //     view: view
    // });




    // view.ui.add(bookmarks, {
    //     position: "top-right"
    // });

    // const bookmarksWidget = new Bookmarks({
    //     view: view
    // });
    // const bookmarksExpand = new Expand({
    //     view: view,
    //     content: bookmarksWidget
    // });
    // view.ui.add(bookmarksExpand, "bottom-left");

    // bookmarksWidget.on("select-bookmark", function(event) {
    //     bookmarksExpand.expanded = false;
    // });

});