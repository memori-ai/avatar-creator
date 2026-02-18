import ModelViewer from '@memori.ai/memori-react/src/components/CustomGLBModelViewer/ModelViewer'
import { Button, Card } from '@memori.ai/ui'
import { useEffect, useRef, useState } from 'react'

import './styles.css'
import type { TFunction } from 'i18next'

export type AvatarCategory = 'casual' | 'crazy' | 'office' | 'funky'

export interface AvatarData {
  MALE: {
    casual: string[]
    funky: string[]
    office: string[]
  }
  FEMALE: {
    casual: string[]
    office: string[]
    funky: string[]
  }
}

export const avatarData: AvatarData = {
  MALE: {
    casual: [
      'https://assets.memori.ai/api/v2/asset/b701d25b-772e-4792-94aa-8f9472e59398.glb',
      'https://assets.memori.ai/api/v2/asset/8f3edf20-1ee5-4eb6-af93-19eeda4551b4.glb',
      'https://assets.memori.ai/api/v2/asset/7806e0c2-9208-41d3-9e45-5d4b75b36cca.glb',
      'https://assets.memori.ai/api/v2/asset/70fad834-177b-4460-bea8-577d03903b7f.glb',
      'https://assets.memori.ai/api/v2/asset/eb0cb52a-2c22-4865-ac72-0db771a3d42a.glb',
    ],
    funky: [
      'https://assets.memori.ai/api/v2/asset/ea4aaab5-3a9e-4d57-a554-4ecef3bf7fe4.glb',
      'https://assets.memori.ai/api/v2/asset/0e9cb755-58ef-4090-9d37-b1d2e89f4c83.glb',
      'https://assets.memori.ai/api/v2/asset/c75f3418-f87d-4eaa-9389-cc239e8b19e0.glb',
      'https://assets.memori.ai/api/v2/asset/72f17fd4-8f13-4141-99b5-90892f1c168e.glb',
      'https://assets.memori.ai/api/v2/asset/9f2047ed-8a05-465b-a649-a04315dced7d.glb',
      'https://assets.memori.ai/api/v2/asset/af56a4ec-33d3-41d1-a267-d9e729613793.glb',
      'https://assets.memori.ai/api/v2/asset/baf299b2-f230-4f1e-a264-e0b243063cbf.glb',
      'https://assets.memori.ai/api/v2/asset/3543d713-37e3-427e-bff0-d3fa1f547bac.glb',
    ],
    office: [
      'https://assets.memori.ai/api/v2/asset/4a0885e8-2199-4a32-a54d-f44a2bdc6a53.glb',
      'https://assets.memori.ai/api/v2/asset/675aa8ca-b161-483e-a0be-cb62cf77afcc.glb',
      'https://assets.memori.ai/api/v2/asset/9d53165f-e341-4801-8cdc-aa744959ab77.glb',
      'https://assets.memori.ai/api/v2/asset/b88f3ed0-3a92-4626-a0e1-456e9bd8307c.glb',
      'https://assets.memori.ai/api/v2/asset/16d62b30-5f77-47cd-8d21-2c4f61cfc87d.glb',
    ],
  },
  FEMALE: {
    casual: [
      'https://assets.memori.ai/api/v2/asset/9dfff56a-bee9-4dde-8061-b9fc267ae552.glb',
      'https://assets.memori.ai/api/v2/asset/a140cbe8-2f2a-48a0-8f46-3423d776b9fd.glb',
      'https://assets.memori.ai/api/v2/asset/070084b0-6324-4301-a282-40cd23b1efbb.glb',
      'https://assets.memori.ai/api/v2/asset/6154b939-6a8d-472c-b077-35597db0014b.glb',
      'https://assets.memori.ai/api/v2/asset/ec894a96-12b4-4754-895f-6820b5bbd1a9.glb',
    ],
    funky: [
      'https://assets.memori.ai/api/v2/asset/6bbb4ce2-00fa-4539-a8ac-cf509a65ca0e.glb',
      'https://assets.memori.ai/api/v2/asset/2796ad08-f27e-4806-8965-78a19cdbe07c.glb',
      'https://assets.memori.ai/api/v2/asset/adc1aec6-8152-423a-83c0-d41e65807372.glb',
      'https://assets.memori.ai/api/v2/asset/f9dd6af4-2a50-4a92-bde2-d7a7c47d54b9.glb',
      'https://assets.memori.ai/api/v2/asset/f4814190-2b47-4856-9b98-424d62bac524.glb',
      'https://assets.memori.ai/api/v2/asset/ebc437a1-2e15-479c-a0f6-ad731de4e055.glb',
      'https://assets.memori.ai/api/v2/asset/c2640eec-1b1d-464d-8f2b-b1a32457fa84.glb',
      'https://assets.memori.ai/api/v2/asset/b5cfdbdd-3b17-448e-8f4a-50165c8d285f.glb',
    ],
    office: [
      'https://assets.memori.ai/api/v2/asset/ca9c2936-c764-4e97-b3c0-9a187ef13b92.glb',
      'https://assets.memori.ai/api/v2/asset/1b16fb0e-4738-49fa-834d-eb8f8d2907e9.glb',
      'https://assets.memori.ai/api/v2/asset/1d6c563d-e58b-4366-9353-2a8fcaa8a6f5.glb',
      'https://assets.memori.ai/api/v2/asset/06c9a05c-26e9-4afe-98ec-5f0deffea5e6.glb',
      'https://assets.memori.ai/api/v2/asset/e674c4a0-4387-43e9-9aff-a44c9558ae3e.glb',
    ],
  },
}

const defaultT = ((key: string) => {
  const defaults: Record<string, string> = {
    'avatarGrid.selectAvatar': 'Select your avatar',
    'avatarGrid.selectAvatarToStart': 'Choose an avatar to get started',
    'avatarGrid.filterFor': 'Filter for',
    'avatarGrid.female': 'Female',
    'avatarGrid.male': 'Male',
    'avatarGrid.casual': 'Casual',
    'avatarGrid.office': 'Office',
    'avatarGrid.funky': 'Funky',
    'avatarGrid.select': 'Select',
  }
  return defaults[key] ?? key
}) as TFunction

interface Props {
  avatars?: AvatarData
  t?: TFunction
  onSelect: (avatar: string) => void
}

const AvatarGrid: React.FC<Props> = ({
  avatars = avatarData,
  t = defaultT,
  onSelect,
}) => {
  const [genderFilter, setGenderFilter] = useState<
    'MALE' | 'FEMALE' | undefined
  >()
  const [categoryFilter, setCategoryFilter] = useState<
    AvatarCategory | undefined
  >()

  const getAvailableCategories = (): AvatarCategory[] => {
    if (!genderFilter) return ['casual', 'office', 'funky']
    if (genderFilter === 'FEMALE') return ['casual', 'office', 'funky']
    return ['casual', 'office', 'funky']
  }

  const getAvatarList = (): string[] => {
    if (!genderFilter) {
      // Show all avatars when no gender filter
      const allAvatars: string[] = []
      Object.values(avatars.MALE).forEach(category => {
        allAvatars.push(...category)
      })
      Object.values(avatars.FEMALE).forEach(category => {
        allAvatars.push(...category)
      })
      return allAvatars
    }

    const genderAvatars = avatars[genderFilter]

    if (!categoryFilter) {
      // Show all categories for selected gender
      const allAvatars: string[] = []
      Object.values(genderAvatars).forEach(category => {
        allAvatars.push(...category)
      })
      return allAvatars
    }

    // Show specific category for selected gender
    if (categoryFilter in genderAvatars) {
      return genderAvatars[categoryFilter as keyof typeof genderAvatars] || []
    }
    return []
  }

  const avatarList = getAvatarList()

  // Lazy-loaded ModelViewer component
  const LazyModelViewer = ({
    src,
    alt,
    index,
  }: {
    src: string
    alt: string
    index: number
  }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
      if (!containerRef.current || isVisible) return

      const currentElement = containerRef.current
      let observerInstance: IntersectionObserver | null = null

      observerInstance = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting && observerInstance) {
            setIsVisible(true)
            observerInstance.unobserve(currentElement)
          }
        },
        {
          root: null,
          threshold: 0.01,
          rootMargin: '100px', // Start loading 100px before entering viewport
        },
      )

      observerInstance.observe(currentElement)

      return () => {
        if (observerInstance) {
          observerInstance.unobserve(currentElement)
        }
      }
    }, [isVisible])

    return (
      <div ref={containerRef} className="model-viewer-container">
        {isVisible ? (
          <ModelViewer src={src} alt={alt} poster="" />
        ) : (
          <div className="model-viewer-placeholder">
            <div className="model-viewer-skeleton" />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="container">
      <h2>{t('avatarGrid.selectAvatar', { ns: 'integrations' })}</h2>
      <p>{t('avatarGrid.selectAvatarToStart', { ns: 'integrations' })}</p>

      <div
        role="radiogroup"
        aria-labelledby="filters_label"
        id="gender"
        className="gender-filters"
      >
        <h3 id="filters_label" className="filters-title">
          {t('avatarGrid.filterFor', { ns: 'integrations' })}
        </h3>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          <Button
            variant={genderFilter === 'FEMALE' ? 'primary' : 'outline'}
            role="radio"
            aria-checked={genderFilter === 'FEMALE'}
            tabIndex={genderFilter === 'FEMALE' ? 0 : -1}
            onClick={() => {
              setGenderFilter(gf => (gf === 'FEMALE' ? undefined : 'FEMALE'))
              setCategoryFilter(undefined)
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                setGenderFilter(gf => (gf === 'FEMALE' ? undefined : 'FEMALE'))
                setCategoryFilter(undefined)
              }
            }}
          >
            {t('avatarGrid.female', { ns: 'integrations' })}
          </Button>
          <Button
            variant={genderFilter === 'MALE' ? 'primary' : 'outline'}
            role="radio"
            aria-checked={genderFilter === 'MALE'}
            tabIndex={genderFilter === 'MALE' ? 0 : -1}
            onClick={() => {
              setGenderFilter(gf => (gf === 'MALE' ? undefined : 'MALE'))
              setCategoryFilter(undefined)
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                setGenderFilter(gf => (gf === 'MALE' ? undefined : 'MALE'))
                setCategoryFilter(undefined)
              }
            }}
          >
            {t('avatarGrid.male', { ns: 'integrations' })}
          </Button>
          {(genderFilter || categoryFilter) && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                paddingLeft: '0.5rem',
                borderLeft: '1px solid #e0e0e0',
              }}
            >
              {getAvailableCategories().map(category => {
                const categoryName = t(`avatarGrid.${category.toLowerCase()}`, {
                  ns: 'integrations',
                })
                return (
                  <div
                    key={category}
                    className={`memori-button memori-button--rounded memori-button--padded ${
                      categoryFilter === category
                        ? 'memori-button--primary'
                        : ''
                    }`}
                    role="radio"
                    aria-checked={categoryFilter === category}
                    tabIndex={categoryFilter === category ? 0 : -1}
                    onClick={() => {
                      setCategoryFilter(cf =>
                        cf === category ? undefined : category,
                      )
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setCategoryFilter(cf =>
                          cf === category ? undefined : category,
                        )
                      }
                    }}
                  >
                    {categoryName}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <div className="memori-avatar-creator">
        {avatarList.filter(Boolean).map((glbURL, index) => (
          <Card
            key={glbURL}
            className="memori-card memori-card--hoverable memori-card--pointer"
          >
            <div className="memori-card--content">
              <LazyModelViewer
                src={glbURL}
                alt={`Avatar ${index + 1}`}
                index={index}
              />
              <Button
                style={{ zIndex: 10001 }}
                variant="primary"
                className="memori-button-select"
                shape="round"
                onClick={() => onSelect(glbURL)}
              >
                {t('avatarGrid.select', { ns: 'integrations' })}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AvatarGrid
