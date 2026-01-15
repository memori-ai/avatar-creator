import ModelViewer from '@memori.ai/memori-react/src/components/CustomGLBModelViewer/ModelViewer'
import Button from '@memori.ai/memori-react/src/components/ui/Button'
import { useState } from 'react'

const avatars = {
  MALE: [
    'https://assets.memori.ai/api/v2/asset/d9b69591-cc12-4e76-b91c-e8b00251dedc.glb',
    'https://assets.memori.ai/api/v2/asset/d9b69591-cc12-4e76-b91c-e8b00251dedc.glb',
  ],
  FEMALE: [
    'https://assets.memori.ai/api/v2/asset/d073b7ca-88e1-4f66-b360-fce5531c95fd.glb',
    'https://assets.memori.ai/api/v2/asset/d073b7ca-88e1-4f66-b360-fce5531c95fd.glb',
  ],
}

interface Props {
  lang: 'it' | 'en'
  onSelect: (avatar: string) => void
}

const AvatarCreator: React.FC<Props> = ({ lang, onSelect }) => {
  const [genderFilter, setGenderFilter] = useState<
    'MALE' | 'FEMALE' | undefined
  >()

  const avatarList = genderFilter
    ? avatars[genderFilter]
    : avatars.FEMALE.flatMap((a, i) => [a, avatars.MALE[i] ?? ''])

  return (
    <div className="container">
      <h2>
        {lang === 'it' ? 'Seleziona il tuo avatar' : 'Select your avatar'}
      </h2>
      <p>
        {lang === 'it'
          ? 'Seleziona il tuo avatar per iniziare'
          : 'Select your avatar to start'}
      </p>

      <div
        role="radiogroup"
        aria-labelledby="filters_label"
        id="gender"
        className="gender-filters"
      >
        <h3 id="filters_label" className="filters-title">
          {lang === 'it' ? 'Filtra per' : 'Filter for'}
        </h3>
        <div
          className={`memori-button memori-button--rounded memori-button--padded${genderFilter === 'FEMALE' ? ' memori-button--primary' : ''}`}
          role="radio"
          aria-checked={genderFilter === 'FEMALE'}
          tabIndex={genderFilter === 'FEMALE' ? 0 : -1}
          onClick={() => {
            console.log('FEMALE')
            setGenderFilter(gf => (gf === 'FEMALE' ? undefined : 'FEMALE'))
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              setGenderFilter(gf => (gf === 'FEMALE' ? undefined : 'FEMALE'))
            }
          }}
        >
          {lang === 'it' ? 'Femminile' : 'Female'}
        </div>
        <div
          className={`memori-button memori-button--rounded memori-button--padded${genderFilter === 'MALE' ? ' memori-button--primary' : ''}`}
          role="radio"
          aria-checked={genderFilter === 'MALE'}
          tabIndex={genderFilter === 'MALE' ? 0 : -1}
          onClick={() => {
            console.log('MALE')
            setGenderFilter(gf => (gf === 'MALE' ? undefined : 'MALE'))
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              setGenderFilter(gf => (gf === 'MALE' ? undefined : 'MALE'))
            }
          }}
        >
          {lang === 'it' ? 'Maschile' : 'Male'}
        </div>
      </div>

      <div className="memori-avatar-creator">
        {avatarList.filter(Boolean).map((glbURL, index) => (
          <div
            key={`avatar-${index}`}
            className="memori-card memori-card--hoverable memori-card--pointer"
          >
            <div className="memori-card--content">
              <ModelViewer src={glbURL} alt={`Avatar ${index + 1}`} poster="" />
              <Button shape="rounded" outlined onClick={() => onSelect(glbURL)}>
                Select
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AvatarCreator
