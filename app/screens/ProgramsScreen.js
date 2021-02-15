import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'

import CardItem from '../components/CardItem'
import Screen from '../components/Screen'

import colors from '../config/colors'

import clientApi from '../api/clientApi'

export default function ProgramsScreen() {
  const [programs, setPrograms] = useState()
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const [titleHrt1, setTitleHrt1] = useState('Test title')
  const [titleHrt2, setTitleHrt2] = useState('Test title')
  const [titleRtl, setTitleRtl] = useState('Test title')
  const [titleNovaTv, setTitleNovaTv] = useState('Test title')
  const [titleRtl2, setTitleRtl2] = useState('Test title')
  const [titleDomaTv, setTitleDomaTv] = useState('Test title')
  const [subTitleHrt1, setSubTitleHrt1] = useState('Test subtitle')
  const [subTitleHrt2, setSubTitleHrt2] = useState('Test subtitle')
  const [subTitleRtl, setSubTitleRtl] = useState('Test subtitle')
  const [subTitleNovaTv, setSubTitleNovaTv] = useState('Test subtitle')
  const [subTitleRtl2, setSubTitleRtl2] = useState('Test subtitle')
  const [subTitleDomaTv, setSubTitleDomaTv] = useState('Test subtitle')

  const getPrograms = async () => {
    const { data } = await clientApi.getProgramsWithShows()

    // console.log('Result: ', data)
    data.forEach((program) => {
      if (program.name === 'HRT 1') {
        program.shows.forEach((show) => {
          if (show.timeStart < time && show.timeEnd > time) {
            console.log('HRT 1!')
            console.log(`${show.time} - ${show.title}`)
            setTitleHrt1(`${show.time} - ${show.title}`)
            setSubTitleHrt1(`${show.next}`)
          }
        })
      }
      if (program.name === 'HRT 2') {
        program.shows.forEach((show) => {
          if (show.timeStart < time && show.timeEnd > time) {
            console.log('HRT 2!')
            console.log(`${show.time} - ${show.title}`)
            setTitleHrt2(`${show.time} - ${show.title}`)
            setSubTitleHrt2(`${show.next}`)
          }
        })
      }

      if (program.name === 'RTL') {
        program.shows.forEach((show) => {
          if (show.timeStart < time && show.timeEnd > time) {
            console.log('RTL!')
            console.log(`${show.time} - ${show.title}`)
            setTitleRtl(`${show.time} - ${show.title}`)
            setSubTitleRtl(`${show.next}`)
          }
        })
      }

      if (program.name === 'Nova TV') {
        program.shows.forEach((show) => {
          if (show.timeStart < time && show.timeEnd > time) {
            console.log('Nova TV!')
            console.log(`${show.time} - ${show.title}`)
            setTitleNovaTv(`${show.time} - ${show.title}`)
            setSubTitleNovaTv(`${show.next}`)
          }
        })
      }

      if (program.name === 'RTL2') {
        program.shows.forEach((show) => {
          if (show.timeStart < time && show.timeEnd > time) {
            console.log('RTL2!')
            console.log(`${show.time} - ${show.title}`)
            setTitleRtl2(`${show.time} - ${show.title}`)
            setSubTitleRtl2(`${show.next}`)
          }
        })
      }

      if (program.name === 'Doma TV') {
        program.shows.forEach((show) => {
          if (show.timeStart < time && show.timeEnd > time) {
            console.log('Doma TV!')
            console.log(`${show.time} - ${show.title}`)
            setTitleDomaTv(`${show.time} - ${show.title}`)
            setSubTitleDomaTv(`${show.next}`)
          }
        })
      }
    })

    setPrograms(data)
    return data
  }

  useEffect(() => {
    getPrograms()
  }, [time])

  // 1 minuta
  const minutesToUpdate = 1000 * 60

  useEffect(() => {
    let minTimer = setInterval(() => {
      const date = new Date().toLocaleTimeString().substr(0, 5)
      setTime(date)
    }, minutesToUpdate)

    console.log(time)

    return () => clearInterval(minTimer)
  }, [time])

  return (
    <Screen style={styles.screen}>
      <ScrollView>
        <CardItem
          imageUrl={require('../assets/hrt1-logo.png')}
          name='HRT 1'
          title={titleHrt1}
          subTitle={subTitleHrt1}
          onPress={() => console.log(item.name)}
        />
        <CardItem
          imageUrl={require('../assets/hrt2-logo.png')}
          name='HRT 2'
          title={titleHrt2}
          subTitle={subTitleHrt2}
          onPress={() => console.log(item.name)}
        />
        <CardItem
          imageUrl={require('../assets/rtl-logo.png')}
          name='RTL'
          title={titleRtl}
          subTitle={subTitleRtl}
          onPress={() => console.log(item.name)}
        />
        <CardItem
          imageUrl={require('../assets/novatv-logo.png')}
          name='Nova TV'
          title={titleNovaTv}
          subTitle={subTitleNovaTv}
          onPress={() => console.log(item.name)}
        />
        <CardItem
          imageUrl={require('../assets/rtl2-logo.png')}
          name='RTL2'
          title={titleRtl2}
          subTitle={subTitleRtl2}
          onPress={() => console.log(item.name)}
        />
        <CardItem
          imageUrl={require('../assets/domatv-logo.png')}
          name='Doma TV'
          title={titleDomaTv}
          subTitle={subTitleDomaTv}
          onPress={() => console.log(item.name)}
        />
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.white
  }
})
