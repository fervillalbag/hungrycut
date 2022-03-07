import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { CgSoftwareUpload } from 'react-icons/cg'
import { IoStar, IoStarOutline } from 'react-icons/io5'
import { useRouter } from 'next/router'

import Layout from '@/components/Layout'
import { FileType } from '@/types/File'
import { useMutation } from '@apollo/client'
import { CREATE_REPORT } from '@/graphql/mutations/report'
import { getToken } from '@/utils/helpers'
import { isAuth, isUserNotFound } from '@/utils/actions'

const Create: React.FC = () => {
  isUserNotFound()
  const router = useRouter()

  const [image, setImage] = useState(null)
  const [fileImage, setFileImage] = useState<FileType | null | Blob>()
  const inputFileRef = useRef(null)

  const [nameFood, setNameFood] = useState<string | null>(null)
  const [typeFood, setTypeFood] = useState<string | null>(null)
  const [feeling, setFeeling] = useState<number>(0)
  const [favorite, setFavorite] = useState<number>(0)
  const [proteinsValue, setProteinsValue] = useState<number>(0)
  const [carbohydratesValue, setCarbohydratesValue] = useState<number>(0)
  const [caloriesValue, setCaloriesValue] = useState<number>(0)

  const [loaderUpload, setLoaderUpload] = useState<boolean>(false)

  const [createReportMutation] = useMutation(CREATE_REPORT)

  useEffect(() => {
    const token = getToken()

    if (!token) {
      return null
    } else {
      isAuth()
    }
  }, [])

  const handleUploadImage = () => {
    inputFileRef.current.click()
  }

  const handleChangeType = (type: string) => {
    setTypeFood(type)
  }

  const handleChangeFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement
    const file = target.files[0]
    const image = URL.createObjectURL(file)
    setImage(image)
    setFileImage(file)
  }

  const handleCreateReport = async () => {
    setLoaderUpload(true)

    const urlCloudinary = process.env.URL_CLOUDINARY_RES
    const formData = new FormData()
    formData.append('file', fileImage as string | Blob)
    formData.append(
      'upload_preset',
      process.env.CLOUDINARY_NAME_PRESET_REPORT as string
    )
    const resImage = await fetch(urlCloudinary as string, {
      method: 'post',
      body: formData
    })
    const imageData = await resImage.json()

    try {
      const response = await createReportMutation({
        variables: {
          input: {
            name: nameFood,
            type: typeFood,
            image: imageData?.secure_url,
            calories: caloriesValue,
            carbohydrates: carbohydratesValue,
            proteins: proteinsValue,
            isFavorite: Number(favorite),
            feeling: Number(feeling)
          }
        }
      })
      toast.success(response?.data?.createReport?.message)
      router.push('/')
    } catch (error) {
      console.log(error)
    }

    setLoaderUpload(false)
  }

  return (
    <Layout>
      <header className="p-5">
        <span className="block text-xl font-semibold text-primary">
          Crear reporte
        </span>
      </header>

      {loaderUpload && (
        <div className="lef-0 fixed top-0 z-50 flex h-screen w-screen items-center justify-center bg-white">
          <span className="block">Subiendo..</span>
        </div>
      )}

      <div className="mb-5 px-5">
        <div>
          <button
            type="button"
            className="flex w-full items-center justify-center rounded-md bg-white px-5 py-3 shadow-sm"
            onClick={handleUploadImage}
          >
            <span className="mr-2 text-2xl text-primary">
              <CgSoftwareUpload />
            </span>
            <span className="font-semibold text-primary">Agregar imagen</span>
          </button>
          <input
            ref={inputFileRef}
            type="file"
            className="hidden"
            onChange={handleChangeFileImage}
          />
        </div>
      </div>

      {image && (
        <div className="mb-5 px-5">
          <img src={image} alt="" className="h-48 w-48 object-cover" />
        </div>
      )}

      <div className="mt-3 px-5">
        <span className="mb-2 block text-lg font-semibold text-primary">
          Ingrese nombre de la comida
        </span>
        <input
          type="text"
          className="mb-5 w-full rounded border border-slate-200 py-3 px-4 focus:outline-primary"
          onChange={e => setNameFood(e.target.value)}
          value={nameFood || ''}
        />
      </div>

      <div className="px-5">
        <span className="mb-2 block text-lg font-semibold text-primary">
          Selecciona comida del día
        </span>
        <div className="flex flex-wrap">
          <button
            className={`mr-3 mb-3 block rounded-lg border border-slate-200 px-4 py-2 text-primary ${
              typeFood === 'breakfast' ? 'bg-slate-200 text-slate-600' : null
            }`}
            onClick={() => handleChangeType('breakfast')}
          >
            Desayuno
          </button>
          <button
            className={`mr-3 mb-3 block rounded-lg border border-slate-200 px-4 py-2 text-primary ${
              typeFood === 'midmorning' ? 'bg-slate-200 text-slate-600' : null
            }`}
            onClick={() => handleChangeType('midmorning')}
          >
            Media mañana
          </button>
          <button
            className={`mr-3 mb-3 block rounded-lg border border-slate-200 px-4 py-2 text-primary ${
              typeFood === 'lunch' ? 'bg-slate-200 text-slate-600' : null
            }`}
            onClick={() => handleChangeType('lunch')}
          >
            Almuerzo
          </button>
          <button
            className={`mr-3 mb-3 block rounded-lg border border-slate-200 px-4 py-2 text-primary ${
              typeFood === 'after_snack' ? 'bg-slate-200 text-slate-600' : null
            }`}
            onClick={() => handleChangeType('after_snack')}
          >
            Merieda
          </button>
          <button
            className={`mr-3 mb-3 block rounded-lg border border-slate-200 px-4 py-2 text-primary ${
              typeFood === 'dinner' ? 'bg-slate-200 text-slate-600' : null
            }`}
            onClick={() => handleChangeType('dinner')}
          >
            Cena
          </button>
          <button
            className={`mr-3 mb-3 block rounded-lg border border-slate-200 px-4 py-2 text-primary ${
              typeFood === 'snack' ? 'bg-slate-200 text-slate-600' : null
            }`}
            onClick={() => handleChangeType('snack')}
          >
            Tentempié
          </button>
        </div>
      </div>

      <div className="mt-4 px-5">
        <article className="mb-8">
          <span className="mb-2 block text-lg font-semibold text-primary">
            Proteínas
          </span>
          <span className="mb-2 block text-4xl font-bold text-primary">
            {proteinsValue}%
          </span>
          <input
            type="range"
            value={proteinsValue}
            className="slider h-3 w-full appearance-none rounded-lg bg-slate-300 outline-none"
            onChange={e => setProteinsValue(Number(e.target.value))}
            step={10}
            max={100}
          />
        </article>
        <article className="mb-8">
          <span className="mb-2 block text-lg font-semibold text-primary">
            Carbohidratos
          </span>
          <span className="mb-2 block text-4xl font-bold text-primary">
            {carbohydratesValue}%
          </span>
          <input
            type="range"
            value={carbohydratesValue}
            className="slider h-3 w-full appearance-none rounded-lg bg-slate-300 outline-none"
            onChange={e => setCarbohydratesValue(Number(e.target.value))}
            step={10}
            max={100}
          />
        </article>
        <article className="mb-8">
          <span className="mb-2 block text-lg font-semibold text-primary">
            Calorías
          </span>
          <span className="mb-2 block text-4xl font-bold text-primary">
            {caloriesValue}
          </span>
          <input
            type="range"
            value={caloriesValue}
            className="slider h-3 w-full appearance-none rounded-lg bg-slate-300 outline-none"
            onChange={e => setCaloriesValue(Number(e.target.value))}
            step={100}
            max={5000}
          />
        </article>
      </div>

      <div className="px-5">
        <span className="mb-2 block text-lg font-semibold text-primary">
          Como me sentí
        </span>
        <div className="flex items-center">
          <button
            className={`mr-4 block rounded border-2 py-2 px-4 ${
              feeling === 1 ? 'border-2 border-primary' : 'border-slate-300'
            }`}
            onClick={() => setFeeling(1)}
          >
            <img src="/smile.png" alt="" className="h-10 w-10 object-contain" />
          </button>
          <button
            className={`mr-4 block rounded border-2 py-2 px-4 ${
              feeling === 2 ? 'border-2 border-primary' : 'border-slate-300'
            }`}
            onClick={() => setFeeling(2)}
          >
            <img src="/think.png" alt="" className="h-10 w-10 object-contain" />
          </button>
          <button
            className={`mr-4 block rounded border-2 py-2 px-4 ${
              feeling === 3 ? 'border-2 border-primary' : 'border-slate-300'
            }`}
            onClick={() => setFeeling(3)}
          >
            <img src="/bad.png" alt="" className="h-10 w-10 object-contain" />
          </button>
        </div>
      </div>

      <div className="mt-10 px-5">
        <span className="mb-2 block text-lg font-semibold text-primary">
          Comida favorita
        </span>

        <div className="flex items-center justify-between">
          <button
            className={`block rounded border border-slate-300 py-2 px-3 text-3xl text-primary`}
            onClick={() => setFavorite(1)}
          >
            {favorite >= 1 ? <IoStar /> : <IoStarOutline />}
          </button>
          <button
            className={`block rounded border border-slate-300 py-2 px-3 text-3xl text-primary`}
            onClick={() => setFavorite(2)}
          >
            {favorite >= 2 ? <IoStar /> : <IoStarOutline />}
          </button>
          <button
            className={`block rounded border border-slate-300 py-2 px-3 text-3xl text-primary`}
            onClick={() => setFavorite(3)}
          >
            {favorite >= 3 ? <IoStar /> : <IoStarOutline />}
          </button>
          <button
            className={`block rounded border border-slate-300 py-2 px-3 text-3xl text-primary`}
            onClick={() => setFavorite(4)}
          >
            {favorite >= 4 ? <IoStar /> : <IoStarOutline />}
          </button>
          <button
            className={`block rounded border border-slate-300 py-2 px-3 text-3xl text-primary`}
            onClick={() => setFavorite(5)}
          >
            {favorite >= 5 ? <IoStar /> : <IoStarOutline />}
          </button>
        </div>
      </div>

      <div className="mt-6 mb-4 px-5">
        <button
          className=" block w-full rounded bg-primary py-4 text-lg text-white"
          onClick={handleCreateReport}
        >
          Generar reporte
        </button>
      </div>
    </Layout>
  )
}

export default Create
