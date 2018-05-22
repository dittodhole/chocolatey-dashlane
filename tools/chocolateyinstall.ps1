$packageName = 'dashlane'
$installerType = 'exe'
$silentArgs = '/SD'
$url = 'https://d3qm0vl2sdkrc.cloudfront.net/releases/5.12.0/5.12.0.19744/release/DashlaneInst.exe'
$checksum = '8fbf96c59c5422cb2b7044a003eacba96c468e4a'
$checksumType = 'sha1'
$validExitCodes = @(0,1223)

Install-ChocolateyPackage -PackageName "$packageName" `
                          -FileType "$installerType" `
                          -SilentArgs "$silentArgs" `
                          -Url "$url" `
                          -ValidExitCodes $validExitCodes `
                          -Checksum "$checksum" `
                          -ChecksumType "$checksumType"

Start-Sleep -Seconds 20

Get-Process -Name "Dashlane*" | foreach {
  Write-Host "Stopping $($_.ProcessName) process ($($_.Id)) ..."
  Stop-Process $_
}