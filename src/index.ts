import check from './check'
import compareVersions from './changelog'
import versionCheck from './versionCheck'
import prettierCheck from './prettier'
import eslintCheck from './lint'

compareVersions()
versionCheck()
prettierCheck()
eslintCheck()
check()
