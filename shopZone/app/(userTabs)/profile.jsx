import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileScreen from '../ProfileScreen/ProfileScreen'
import  WebNavBar from "./../../components/WebNavBar"

const profile = () => {
  return <><WebNavBar /><ProfileScreen /></>
}

export default profile

const styles = StyleSheet.create({})