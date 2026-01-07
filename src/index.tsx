import ModelViewer from '@memori.ai/memori-react/src/components/CustomGLBModelViewer/ModelViewer'
import Button from '@memori.ai/memori-react/src/components/ui/Button'

const glbURL =
  'https://assets.memori.ai/api/v2/asset/d073b7ca-88e1-4f66-b360-fce5531c95fd.glb'
const AVATAR_TOTAL = 10

interface Props {
  lang: 'it' | 'en'
  onSelect: (avatar: string) => void
}

const AvatarCreator: React.FC<Props> = ({ lang, onSelect }) => {
  return (
    <div>
      <h2>
        {lang === 'it' ? 'Seleziona il tuo avatar' : 'Select your avatar'}
      </h2>
      <p>
        {lang === 'it'
          ? 'Seleziona il tuo avatar per iniziare'
          : 'Select your avatar to start'}
      </p>
      <div className="memori-avatar-creator">
        {Array.from({ length: AVATAR_TOTAL }).map((_, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: We use the index as a key
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

      <script
        type="module"
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
      ></script>
    </div>
  )
}

export default AvatarCreator
