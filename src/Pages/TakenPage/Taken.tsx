import React, { useState } from 'react'
// import { useAxios } from 'Lib'
// import { useSelector } from 'react-redux'
// import { useQuery } from 'react-query'
// import { isAccountUser, isCaseManager } from 'Lib'
// import { AppState } from 'App/reducers'
// import { AccountUserDashboard } from './AccountUserDashboard'
// import { CaseUserDashboard } from './CaseUserDashboard'
// import { DashboardScreen, QueryKey } from 'types'
import { Pagination } from 'UI/Components'
import { DashboardLayout, Template } from 'UI'
import { useTranslation } from 'react-i18next'
import { ThreeBounce } from 'better-react-spinkit'
import { QueryKey } from 'types'
import { useQuery } from 'react-query'
import { useIsMounted, useAxios, getPaginationData } from 'Lib'
import { TakenDataItem } from './types'
import dayjs from 'dayjs'

export function TakenPage() {
  const { t } = useTranslation()
  const { setSafely } = useIsMounted()
  const axios = useAxios()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // const [initTakenData, setInitTakenData] = useState<TakenDataItem[]>([])
  const [takenData, setTakenData] = useState<TakenDataItem[]>([])

  const initTakenData: TakenDataItem[] = [
    {
      Id: 2,
      Deelnemernummer: '236848',
      Deelnemernaam: 'G. Marinakis',
      Bladnummer: '1',
      Volgnummer: '1',
      Reden: 'U17',
      Uitstroomresultaat: 'VOOR AANVANG UITGESCHREVEN',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T11:00:03.19',
    },
    {
      Id: 3,
      Deelnemernummer: '226961',
      Deelnemernaam: 'S. Hogeveen-Eppenga',
      Bladnummer: '1',
      Volgnummer: '2',
      Reden: 'U71',
      Uitstroomresultaat: 'VOORTIJDIG UITGESTROOMD',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T15:57:37.56',
    },
    {
      Id: 4,
      Deelnemernummer: '219094',
      Deelnemernaam: 'L. Slob',
      Bladnummer: '1',
      Volgnummer: '1',
      Reden: 'U01',
      Uitstroomresultaat: 'SUCCESVOL/GESLAAGD',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T16:39:03.3466667',
    },
    {
      Id: 2,
      Deelnemernummer: '236848',
      Deelnemernaam: 'G. Marinakis',
      Bladnummer: '1',
      Volgnummer: '1',
      Reden: 'U17',
      Uitstroomresultaat: 'VOOR AANVANG UITGESCHREVEN',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T11:00:03.19',
    },
    {
      Id: 3,
      Deelnemernummer: '226961',
      Deelnemernaam: 'S. Hogeveen-Eppenga',
      Bladnummer: '1',
      Volgnummer: '2',
      Reden: 'U71',
      Uitstroomresultaat: 'VOORTIJDIG UITGESTROOMD',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T15:57:37.56',
    },
    {
      Id: 4,
      Deelnemernummer: '219094',
      Deelnemernaam: 'L. Slob',
      Bladnummer: '1',
      Volgnummer: '1',
      Reden: 'U01',
      Uitstroomresultaat: 'SUCCESVOL/GESLAAGD',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T16:39:03.3466667',
    },
    {
      Id: 2,
      Deelnemernummer: '236848',
      Deelnemernaam: 'G. Marinakis',
      Bladnummer: '1',
      Volgnummer: '1',
      Reden: 'U17',
      Uitstroomresultaat: 'VOOR AANVANG UITGESCHREVEN',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T11:00:03.19',
    },
    {
      Id: 3,
      Deelnemernummer: '226961',
      Deelnemernaam: 'S. Hogeveen-Eppenga',
      Bladnummer: '1',
      Volgnummer: '2',
      Reden: 'U71',
      Uitstroomresultaat: 'VOORTIJDIG UITGESTROOMD',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T15:57:37.56',
    },
    {
      Id: 4,
      Deelnemernummer: '219094',
      Deelnemernaam: 'L. Slob',
      Bladnummer: '1',
      Volgnummer: '1',
      Reden: 'U01',
      Uitstroomresultaat: 'SUCCESVOL/GESLAAGD',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T16:39:03.3466667',
    },
    {
      Id: 2,
      Deelnemernummer: '236848',
      Deelnemernaam: 'G. Marinakis',
      Bladnummer: '1',
      Volgnummer: '1',
      Reden: 'U17',
      Uitstroomresultaat: 'VOOR AANVANG UITGESCHREVEN',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T11:00:03.19',
    },
    {
      Id: 3,
      Deelnemernummer: '226961',
      Deelnemernaam: 'S. Hogeveen-Eppenga',
      Bladnummer: '1',
      Volgnummer: '2',
      Reden: 'U71',
      Uitstroomresultaat: 'VOORTIJDIG UITGESTROOMD',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T15:57:37.56',
    },
    {
      Id: 4,
      Deelnemernummer: '219094',
      Deelnemernaam: 'L. Slob',
      Bladnummer: '1',
      Volgnummer: '1',
      Reden: 'U01',
      Uitstroomresultaat: 'SUCCESVOL/GESLAAGD',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T16:39:03.3466667',
    },
    {
      Id: 2,
      Deelnemernummer: '236848',
      Deelnemernaam: 'G. Marinakis',
      Bladnummer: '1',
      Volgnummer: '1',
      Reden: 'U17',
      Uitstroomresultaat: 'VOOR AANVANG UITGESCHREVEN',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T11:00:03.19',
    },
    {
      Id: 3,
      Deelnemernummer: '226961',
      Deelnemernaam: 'S. Hogeveen-Eppenga',
      Bladnummer: '1',
      Volgnummer: '2',
      Reden: 'U71',
      Uitstroomresultaat: 'VOORTIJDIG UITGESTROOMD',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T15:57:37.56',
    },
    {
      Id: 4,
      Deelnemernummer: '219094',
      Deelnemernaam: 'L. Slob',
      Bladnummer: '1',
      Volgnummer: '1',
      Reden: 'U01',
      Uitstroomresultaat: 'SUCCESVOL/GESLAAGD',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T16:39:03.3466667',
    },
    {
      Id: 2,
      Deelnemernummer: '236848',
      Deelnemernaam: 'G. Marinakis',
      Bladnummer: '1',
      Volgnummer: '1',
      Reden: 'U17',
      Uitstroomresultaat: 'VOOR AANVANG UITGESCHREVEN',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T11:00:03.19',
    },
    {
      Id: 3,
      Deelnemernummer: '226961',
      Deelnemernaam: 'S. Hogeveen-Eppenga',
      Bladnummer: '1',
      Volgnummer: '2',
      Reden: 'U71',
      Uitstroomresultaat: 'VOORTIJDIG UITGESTROOMD',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T15:57:37.56',
    },
    {
      Id: 4,
      Deelnemernummer: '219094',
      Deelnemernaam: 'L. Slob',
      Bladnummer: '1',
      Volgnummer: '1',
      Reden: 'U01',
      Uitstroomresultaat: 'SUCCESVOL/GESLAAGD',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T16:39:03.3466667',
    },
    {
      Id: 2,
      Deelnemernummer: '236848',
      Deelnemernaam: 'G. Marinakis',
      Bladnummer: '1',
      Volgnummer: '1',
      Reden: 'U17',
      Uitstroomresultaat: 'VOOR AANVANG UITGESCHREVEN',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T11:00:03.19',
    },
    {
      Id: 3,
      Deelnemernummer: '226961',
      Deelnemernaam: 'S. Hogeveen-Eppenga',
      Bladnummer: '1',
      Volgnummer: '2',
      Reden: 'U71',
      Uitstroomresultaat: 'VOORTIJDIG UITGESTROOMD',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T15:57:37.56',
    },
    {
      Id: 4,
      Deelnemernummer: '219094',
      Deelnemernaam: 'L. Slob',
      Bladnummer: '1',
      Volgnummer: '1',
      Reden: 'U01',
      Uitstroomresultaat: 'SUCCESVOL/GESLAAGD',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T16:39:03.3466667',
    },
    {
      Id: 2,
      Deelnemernummer: '236848',
      Deelnemernaam: 'G. Marinakis',
      Bladnummer: '1',
      Volgnummer: '1',
      Reden: 'U17',
      Uitstroomresultaat: 'VOOR AANVANG UITGESCHREVEN',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T11:00:03.19',
    },
    {
      Id: 3,
      Deelnemernummer: '226961',
      Deelnemernaam: 'S. Hogeveen-Eppenga',
      Bladnummer: '1',
      Volgnummer: '2',
      Reden: 'U71',
      Uitstroomresultaat: 'VOORTIJDIG UITGESTROOMD',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T15:57:37.56',
    },
    {
      Id: 4,
      Deelnemernummer: '219094',
      Deelnemernaam: 'L. Slob',
      Bladnummer: '1',
      Volgnummer: '1',
      Reden: 'U01',
      Uitstroomresultaat: 'SUCCESVOL/GESLAAGD',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T16:39:03.3466667',
    },
    {
      Id: 2,
      Deelnemernummer: '236848',
      Deelnemernaam: 'G. Marinakis',
      Bladnummer: '1',
      Volgnummer: '1',
      Reden: 'U17',
      Uitstroomresultaat: 'VOOR AANVANG UITGESCHREVEN',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T11:00:03.19',
    },
    {
      Id: 3,
      Deelnemernummer: '226961',
      Deelnemernaam: 'S. Hogeveen-Eppenga',
      Bladnummer: '1',
      Volgnummer: '2',
      Reden: 'U71',
      Uitstroomresultaat: 'VOORTIJDIG UITGESTROOMD',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T15:57:37.56',
    },
    {
      Id: 4,
      Deelnemernummer: '219094',
      Deelnemernaam: 'L. Slob',
      Bladnummer: '1',
      Volgnummer: '1',
      Reden: 'U01',
      Uitstroomresultaat: 'SUCCESVOL/GESLAAGD',
      Taakstatus: 'Open',
      Aanmaakdatum: '2021-05-25T16:39:03.3466667',
    },
  ]

  const getTakenData = async (): Promise<TakenDataItem[]> => {
    setSafely(setIsLoading, true)
    const { data } = await axios.get(`/api/users/GetUsers?excludeActiveUsers=false`)
    return data
  }

  useQuery(QueryKey.takenScreen, getTakenData, {
    onSuccess: (data) => {
      setSafely(setIsLoading, false)
      // setSafely(setInitTakenData, data)
      changePaginationUserData(20, 1, initTakenData)
    },
  })

  const changePaginationUserData = (pageSize: number, page: number, initData: TakenDataItem[]) => {
    const result = getPaginationData(pageSize, page, initData)
    setSafely(setTakenData, result)
  }

  return (
    <DashboardLayout title={t('Taken')}>
      <Template title={t('Taken')}>
        <div className="table-container px-4 mt-5">
          <div className="table-responsive mt-4">
            <table id="user-table" className="mb-1 table">
              <thead className="table-light">
                <tr>
                  <th>{t('Deelnemernummer')}</th>
                  <th>{t('Deelnemernaam')}</th>
                  <th>{t('Bladnummer')}</th>
                  <th>{t('Volgnummer')}</th>
                  <th>{t('Reden')}</th>
                  <th>{t('Uitstroomresultaat')}</th>
                  <th>{t('Taakstatus')}</th>
                  <th>{t('Aanmaakdatum')}</th>
                </tr>
              </thead>
              {takenData && !isLoading && (
                <tbody>
                  {takenData.map((data: TakenDataItem, i: number) => (
                    <tr key={i}>
                      <td>{data.Deelnemernummer}</td>
                      <td>{data.Deelnemernaam}</td>
                      <td>{data.Bladnummer}</td>
                      <td>{data.Volgnummer}</td>
                      <td>{data.Reden}</td>
                      <td>{data.Uitstroomresultaat}</td>
                      <td>{data.Taakstatus}</td>
                      <td>{dayjs(data.Aanmaakdatum).format('YYYY-MM-DD')}</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            {isLoading && (
              <div
                className="col-md-4 offset-md-4 col-xs-12 text-center loading"
                style={{ textAlign: 'center' }}
              >
                <ThreeBounce size={15} color="#585858" />
              </div>
            )}
            <Pagination
              recordNum={initTakenData.length}
              getData={(pageSize: number, page: number) =>
                changePaginationUserData(pageSize, page, initTakenData)
              }
            />
          </div>
        </div>
      </Template>
    </DashboardLayout>
  )
}
