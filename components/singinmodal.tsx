import {getSession} from 'next-auth/react'

function singInModal({session}:any) {
  return (
    <div>
      bottons
    </div>
  )
}


export const getServerSideProps = async (context:any) => {
  const session =  await getSession(context)


  //esta opcion lo redireccion si no tiene credenciales
  // if (!session) return {
  //   redirect:{
  //     detination: '/login',
  //     permanent: false
  //   }
  // }

  return {
    props:{
      session
    }
  }
}

export default singInModal