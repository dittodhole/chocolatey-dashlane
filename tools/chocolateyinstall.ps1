$packageName = 'dashlane'
$installerType = 'exe'
$silentArgs = '/SD'
$url = 'https://d3qm0vl2sdkrc.cloudfront.net/releases/5.8.0/5.8.0.17084/release/DashlaneInst.exe'
$checksum = 'f6ea710aac2fb4464dec25b71d3279104e332e41'
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