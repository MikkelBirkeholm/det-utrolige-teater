'use client'
import { useForm } from 'react-hook-form'
import styles from './Tickets.module.scss'
import { useState } from 'react'
import { SeatPicker } from './SeatPicker'
import Image from 'next/image'

export const TicketsForm = ({ show, rows }) => {
  const [antal, setAntal] = useState(1)
  const [seats, setSeats] = useState(null)
  const [step, setStep] = useState(1) // 1 = form, 2 = confirm, 3 = end
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      fornavn: '',
      efternavn: '',
      vejnavn: '',
      nummer: '',
      postnummer: '',
      antal: '1',
    },
  })

  const allFields = watch()

  const onSubmit = async () => {
    if (seats.length < parseInt(antal)) {
      alert('Vælg venligst pladser')
      return
    }
    console.log('form submitted', allFields)
  }

  function handleSeatSelectionCallback(e) {
    setSeats(e)
  }

  function handleStep(step) {
    setStep(step)
  }

  if (step == 1) {
    return (
      <>
        <form
          className={styles.formWrapper}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.formInner}>
            <div className={styles.imageContainer}>
              <Image
                src={`/images/events/large/${show.image}`}
                width={200}
                height={200}
                style={{ objectFit: 'cover', width: 'auto', height: '100%' }}
                alt={show.title}
              />
            </div>
            <fieldset className={styles.ticketsForm}>
              <h1>Køb Billet</h1>
              <hr />
              <label>
                <span>Fornavn</span>
                <input
                  placeholder="Fornavn"
                  type="text"
                  {...register('fornavn', {
                    required: 'Dette felt skal udfyldes',
                    pattern: {
                      value: /^(?!\s+$)[a-zA-ZÆØÅæøå,'. -]+$/,
                      message: 'Du må kun skrive bogstaver',
                    },
                  })}
                />
              </label>
              {errors.fornavn && (
                <span role="alert">{errors.fornavn.message}</span>
              )}
              <label>
                <span>Efternavn</span>
                <input
                  placeholder="Efternavn"
                  type="text"
                  {...register('efternavn', {
                    required: 'Dette felt skal udfyldes',
                    pattern: {
                      value: /^(?!\s+$)[a-zA-ZÆØÅæøå,'. -]+$/,
                      message: 'Du må kun skrive bogstaver',
                    },
                  })}
                />
              </label>
              {errors.efternavn && (
                <span role="alert">{errors.efternavn.message}</span>
              )}
              <label>
                <span>Vejnavn & Nr.</span>
                <div>
                  <input
                    placeholder="Vejnavn"
                    {...register('vejnavn', { required: true })}
                  />
                  <input
                    type="number"
                    placeholder="Nummer"
                    min={0}
                    {...register('nummer', { required: true })}
                  />
                </div>
              </label>
              <label>
                <span>Postnr. & By</span>
                <div>
                  <input
                    placeholder="Postnummer"
                    {...register('postnummer', {
                      required: true,
                      pattern: {
                        value: /^[0-9]{4}$/,
                        message: 'Postnumre skal være mellem 0000 og 9999',
                      },
                    })}
                  />
                  <input
                    placeholder="By"
                    {...register('by', { required: true })}
                  />
                </div>
              </label>
              {errors.postnummer && (
                <span role="alert">{errors.postnummer.message}</span>
              )}
              <label>
                <span>Antal</span>
                <input
                  type="number"
                  value={antal}
                  min={1}
                  {...register('antal', {
                    required: true,
                    onChange: (e) => setAntal(e.target.value),
                    max: {
                      value: 10,
                      message:
                        'Kontakt os venligt per telefon, hvis du vil booke mere end 10 billetter',
                    },
                    min: {
                      value: 1,
                      message: 'Du skal resereve mindst en billet',
                    },
                  })}
                />
                <span>Pris: {show.price * antal} DKK</span>
              </label>
              {errors.antal && <span role="alert">{errors.antal.message}</span>}
              <span>Alle felter skal udfyldes</span>
            </fieldset>
          </div>
          <SeatPicker
            rows={rows}
            sceneName={show.stage.name}
            seatCount={antal}
            callback={handleSeatSelectionCallback}
          />
        </form>
        <div className={styles.buttonWrapper}>
          <button
            disabled={!isValid || !(seats.length == parseInt(antal))}
            onClick={() => handleStep(2)}
          >
            Godkend Bestilling
          </button>
        </div>
      </>
    )
  }
  if (step == 2) {
    return (
      <>
        <Confirm
          show={show}
          formFields={allFields}
          seats={seats}
        />
        <div className={styles.buttonWrapper}>
          <button onClick={() => handleStep(1)}>Tilbage</button>
          <button onClick={() => handleStep(3)}>Godkend</button>
        </div>
      </>
    )
  }
  if (step == 3) {
    return <ConfirmEnd />
  }
}

export const Confirm = ({ show, formFields, seats }) => {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.formInner}>
        <div className={styles.imageContainer}>
          <Image
            src={`/images/events/large/${show.image}`}
            width={200}
            height={200}
            style={{ objectFit: 'cover', width: 'auto', height: '100%' }}
            alt={show.title}
          />
        </div>
        <div className={styles.orderDetails}>
          <h1>Godkend Ordre</h1>
          <hr />
          <div>
            <h2>Produkter:</h2>
            <p>Forestilling: {show.title}</p>
            <p>Scene: {show.stage.name}</p>
            <p>Dato: </p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Sæde</th>
                <th style={{ width: '60%' }}>Række</th>
                <th>Pris</th>
              </tr>
            </thead>
            <tbody>
              {seats.map((seat) => {
                return (
                  <tr key={seat.id}>
                    <td>{seat.number}</td>
                    <td>{seat.row}</td>
                    <td>{show.price},00 DKK</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>Pris i alt:</td>
                <td>{show.price * seats.length},00 DKK</td>
              </tr>
            </tfoot>
          </table>
          <p>PRIS INKL. MOMS & BILLETGEBYR</p>
          <div>
            <h2>KUNDE:</h2>
            <p>
              {formFields.fornavn} {formFields.efternavn}
            </p>
            <p>
              {formFields.vejnavn} {formFields.nummer}
            </p>
            <p>
              {formFields.postnummer} {formFields.by}
            </p>
            <p>EMAIL MANGLER</p>
          </div>
          <h3>BILLETTERNE SENDES ELEKTRONISK TIL DIN MAIL</h3>
        </div>
      </div>
    </div>
  )
}

export const ConfirmEnd = () => {
  return (
    <div className={styles.contentWrapper}>
      <h1>TAK FOR DIN BESTILLING</h1>
    </div>
  )
}
