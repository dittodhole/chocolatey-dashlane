$packageName = 'dashlane'
$installerType = 'exe'
$silentArgs = '/SD'
$url = 'https://d3qm0vl2sdkrc.cloudfront.net/alpha/Dashlane_Launcher_bchrome-1458725556.exe'
$checksum = '709ac46bb1f6b2c8960a12db403ddaf75c5ff1a7'
$checksumType = 'sha1'
$validExitCodes = @(0,1223)

Install-ChocolateyPackage -PackageName "$packageName" `
                          -FileType "$installerType" `
                          -SilentArgs "$silentArgs" `
                          -Url "$url" `
                          -ValidExitCodes $validExitCodes `
                          -Checksum "$checksum" `
                          -ChecksumType "$checksumType"